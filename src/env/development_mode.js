import { glob } from 'glob' // Import the 'glob' function
import { readFileSync, writeFile } from 'fs' // Import specific functions

const pattern = '../plugin-entry.php' // Modify the pattern to search from the parent director

glob(pattern)
  .then((files) => {
    if (files.length === 0) {
      console.log('😵 No files found matching the pattern:', pattern)
    } else {
      files.forEach((file) => {
        const content = readFileSync(file, 'utf8')

        const mapObj = {
          PRODUCTIO_PRODUCTION: 'PRODUCTIO_DEVELOPMENT'
        }

        const result = content.replace(/PRODUCTIO_PRODUCTION/gi, function (matched) {
          return mapObj[matched]
        })

        // Write our new name in there
        writeFile(file, result, 'utf8', function (err) {
          if (err) return console.log(err)
          console.log('✅ File:(' + file + ')' + ' => Renamed & DEVELOPMENT assets enqueued!')
        })
      })
    } //fi-else
  })
  .catch((err) => {
    console.error('😵 Error searching for files:', err)
  })
