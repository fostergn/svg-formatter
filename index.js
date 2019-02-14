#!/usr/bin/env node
const argv = require('yargs').argv
const xml2js = require('xml2js')
const svgson = require('svgson')
const { stringify } = svgson
const fs = require('fs')
const fsPromises = fs.promises;

const builder = new xml2js.Builder();
const parser = new xml2js.Parser();

(async () => {

  try {

    if (argv.file) {

      const svgFile = await fsPromises.readFile(argv.file, `utf8`)

      const SVGObject = await svgson.parse(svgFile)

      const defsElement = SVGObject.children.find(child => child.name === `defs`)

      const path = defsElement.children.find(child => child.name === `path`)

      console.log(`path: `, path)

      const gElement = SVGObject.children.find(child => child.name === `g`)

      console.log(`gElemetn: `, gElement)

      const newGElement = Object.assign(gElement, {
        children: [
          path
        ]
      })

      console.log(`newGElement: `, newGElement)

      SVGObject.children = gElement

      console.log(`string it my dude: `, stringify(SVGObject))

      // const svgFile = await fsPromises.writeFile(argv.file, newXML)

      // console.log(`wrote that file`)
    }

    else if (argv.directory) {


    }

    else {

      console.log(`Need to specify a --file`)
    }
  } catch (err) {

    console.log(`error: `, err)
  }
})()