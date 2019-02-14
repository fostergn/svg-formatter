A command line tool for extracting just the path from an .svg and overwriting the file. Removes masks, <defs> etc (generated via sketch)

# Getting Started

`git clone git@github.com:fostergn/svg-formatter.git`

`cd svg-formatter`

`npm install`

`chmod +x index.js`

### Run for individual file
```
./index.js --file="~/example.svg"
```

### Run for directory of .svgs
```
./index.js --directory="~/svg-folder/"
```