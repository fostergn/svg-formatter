#!/usr/bin/env node
const argv = require('yargs').argv
const svgson = require('svgson')
const { stringify } = svgson
const fs = require('fs')
const fsPromises = fs.promises;
const isNil = require('lodash.isnil')

const formatSVGFile = async (fileName) => {

  const svgFile = await fsPromises.readFile(fileName, `utf8`)

  const SVGObject = await svgson.parse(svgFile)

  const defsElement = SVGObject.children.find(child => child.name === `defs`)

  if (isNil(defsElement)) {

    console.log(`no <defs> element for ${fileName}`)

    return
  }

  const path = defsElement.children.find(child => child.name === `path`)

  if (isNil(path)) {

    console.log(`no <path> element for ${fileName}`)

    return
  }

  const gElement = SVGObject.children.find(child => child.name === `g`)

  gElement.attributes.fill = `black`

  const newGElement = Object.assign({}, gElement, {
    children: [
      path
    ]
  })

  SVGObject.children = [newGElement]

  const newSVGString = stringify(SVGObject)

  await fsPromises.writeFile(fileName, newSVGString, `utf8`)

  console.log(`finished writing file: ${fileName}`)
}

const main = async () => {

  try {

    if (argv.file) {

      await formatSVGFile(argv.file)
    }

    else if (argv.directory) {

      const directoryFileNames = await fsPromises.readdir(argv.directory)

      const svgFileNames = directoryFileNames.filter(file => file.includes(`.svg`))

      await Promise.all(svgFileNames.map(file => formatSVGFile(`${argv.directory}${file}`)))

      console.log(`-----------------------------------------------------`)
      console.log(`finished processing svgs in ${argv.directory}`)
    }

    else {

      console.log(`Need to specify a --file`)
    }
  } catch (err) {

    console.log(`error: `, err)
  }
}

main()