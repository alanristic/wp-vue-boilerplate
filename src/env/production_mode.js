import { glob } from 'glob';                          // Import the 'glob' function
import { readFileSync, writeFile, unlink } from 'fs'; // Import specific functions

glob("plugin-entry.php")
    .then(files => {
        if (files.length === 0) {
            console.log("😵 No files found matching the pattern:", pattern);
        } else {

            files.forEach(file => {
                const content = readFileSync(file, 'utf8');

                const mapObj = {
                    VVT_BOILERPLATE_DEVELOPMENT: "VVT_BOILERPLATE_PRODUCTION"
                };
    
                const result = data.replace(/VVT_BOILERPLATE_DEVELOPMENT/gi, function (matched) {
                    return mapObj[matched];
                });
    
                // Write our new name in there
                writeFile(file, result, 'utf8', function (err) {
                  if (err) return console.log(err);
                  console.log('✅ File:('+file+')'+' => Renamed & PRODICTION assets enqueued!');
                });

            });

        }//fi-else
  })
  .catch(err => {
    console.error("😵 Error searching for files:", err);
  });