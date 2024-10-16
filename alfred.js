/**
 * Alfed - A simple script to rename your plugin's name, author name and author URL in all files
 * It uses input string manipulations to conform to WordPress Plugin standards (aka naming conventions)
 */
import { createInterface } from 'readline'

import { glob } from 'glob' // Import the 'glob' package (package used for matching file paths using patterns)
import { readFileSync, writeFile, unlink } from 'fs' // Import specific functions

/**
 * Create a terminal interface for collecting user input for the plugin name,
 * Author name and author URL. These are displayed in Plugins List in WordPress
 */
const terminal = createInterface({
  input: process.stdin,
  output: process.stdout
})

/**
 * Convery any string to Wordpress Slug.
 * It's what Wordpress uses for URLs internally.
 *
 * @param {*} Text
 * @returns
 */
function convertToSlug(Text) {
  return Text.toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '')
}
/**
 * onvery any string to 'lowercase'.
 *
 * @param {*} Text
 * @returns
 */
function convertToLowercase(Text) {
  return Text.toLowerCase()
    .replace(/ /g, '')
    .replace(/[^\w-]+/g, '')
}

/**
 * Convert any string to 'camelCase'.
 * Used for variable names and function names in PHP (example: 'pluginName').
 *
 * @param {*} str
 * @returns
 */
function convertToCamelCase(str) {
  return str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, function (match, chr) {
    return chr.toUpperCase()
  })
}

/**
 * Convert any string to 'PascalCase' (also known as StudlyCase).
 * Used for class names in PHP (example: 'PluginName').
 *
 * @param {*} Text
 * @returns
 */
function convertToPascalCase(Text) {
  return Text.toLowerCase() // Convert the entire string to lower case
    .replace(/[^a-zA-Z0-9 ]/g, '') // Remove non-alphanumeric characters except spaces
    .split(' ') // Split the string into words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize the first letter of each word
    .join('') // Join the words together without spaces
}

/**
 * Convert any string to 'UPPERCASE'.
 *
 * @param {*} Text
 * @returns
 */
function convertToUppercase(Text) {
  return Text.toUpperCase()
    .replace(/ /g, '')
    .replace(/[^\w-]+/g, '')
}

// TODO: Add support for question about Author Name (YourName) and URL (YourURL)

// TODO: REMOVE when rewritten
// terminal.question('Please enter your plugin Name:', function (answer) {
//   if (!answer.includes('-')) {
//     answer = answer.replace(/\s+$/, '')
//     console.log('👉 DBG: I answered: ' + answer)

//     //
//     // TODO: 3. Find all file(s) except node_modules and entry
//     //
//     glob('!(node_modules)/*/*.*')
//       .then((files) => {
//         if (files.length === 0) {
//           console.log('😵 No files found matching the pattern:', pattern)
//         } else {
//           console.log('👉👉 DBG: Found the following files: 👇')
//           files.forEach((file) => {
//             console.log('👉👉 DBG: Checking file: ' + file)
//             // Optional: You can access the file content here:
//             const content = readFileSync(file, 'utf8')
//             // Do something with the content
//             const Uppercase = convertToUppercase(answer)
//             const Lowercase = convertToLowercase(answer)
//             const Slug = convertToSlug(answer)
//             const Camel = camalize(answer)

//             var mapObj = {
//               YourPlugin: answer,
//               PluginClassName: Camel,
//               pluginlowercase: Lowercase,
//               PLUGIN_CONST: Uppercase,
//               PluginName: answer,
//               pluginslug: Slug
//             }

//             var result = content.replace(
//               /YourPlugin|PluginClassName|pluginslug|pluginlowercase|PLUGIN_CONST|PluginName/gi,
//               function (matched) {
//                 console.log('👉 DBG: Match found....')
//                 return mapObj[matched]
//               }
//             )

//             // Write our new name in there
//             writeFile(file, result, 'utf8', function (err) {
//               if (err) return console.log(err)
//               console.log('✅ File:(' + file + ')' + ' => Renamed')
//             })
//           })

//           console.log(`
//              _______ _______ _______ ________        _______________________ ______
//             (  ____ (  ___  (       (  ____ ( \      (  ____  \__   __(  ____ (  __  )
//             | (    \ | (   ) | () () | (    )| (     | (     \/  ) (  | (     \| (  )  )
//             | |     | |   | | || || | (____)| |     | (__      | |  | (__   | |   ) |
//             | |     | |   | | |(_)| |  _____| |     |  __)     | |  |  __)  | |   | |
//             | |     | |   | | |   | | (     | |     | (        | |  | (     | |   ) |
//             | (____/| (___) | )   ( | )     | (____/| (____/\   | |  | (____/| (__/  )
//             (_______(_______|/     (|/      (_______(_______/  )_(  (_______(______/

//                 All File Processed Successfully...your Plugin is ready to be developed! 🧞‍♂️
//                 Now run "npm run dev" and activate your plugin.
//                 Enoy ✌️...Made by Alan Ristić
//           `)
//         }
//       })
//       .catch((err) => {
//         console.error('😵 Error searching for files:', err)
//       })

//     // Mess prevention, lol...
//     unlink('_config.yml', (err) => {
//       if (err) {
//         console.log('✅ No unused YAML file here, all good.')
//         return
//       }
//       console.log('✅ Unused file removed, all good.')
//     })

//     // Closing all inputs
//     terminal.close()
//   } else {
//     var suggestion = answer.replace(/-/g, ' ')
//     console.log(
//       "⚠️ Warning: Please don't use hyfen. You may use " + suggestion + ' as your plugin name'
//     )
//     console.log('⚠️ Please run again "node alfred" and enter a unique plugin name.')
//   }
// })

/**
 * Ask the user for the plugin name, author name and author URL, then rename all files in the project
 * so that they conform to WordPress Plugin standards (aka naming conventions) and make
 * plugin functional/ready to be developed.
 */
terminal.question('Please enter Plugin Name: ', function (pluginName) {
  if (!pluginName.includes('-')) {
    terminal.question('Please enter Author Name: ', function (authorName) {
      terminal.question('Please enter Author URL: ', function (url) {
        pluginName = pluginName.replace(/\s+$/, '')
        authorName = authorName.replace(/\s+$/, '')
        url = url.replace(/\s+$/, '')

        console.log('👉 DBG: Plugin Name: ' + pluginName)
        console.log('👉 DBG: Author Name: ' + authorName)
        console.log('👉 DBG: URL: ' + url)

        glob('!(node_modules)/*/*.*')
          .then((files) => {
            if (files.length === 0) {
              console.log('😵 No files found matching the pattern')
            } else {
              console.log('👉👉 DBG: Found the following files: 👇')
              files.forEach((file) => {
                console.log('👉👉 DBG: Checking file: ' + file)
                const content = readFileSync(file, 'utf8') // Read the file's content
                const Uppercase = convertToUppercase(pluginName)
                const Lowercase = convertToLowercase(pluginName)
                const Slug = convertToSlug(pluginName)
                const Camel = convertToCamelCase(pluginName)
                const Pascal = convertToPascalCase(pluginName)

                var mapObj = {
                  YourPlugin: pluginName,
                  PluginClassName: Camel,
                  pluginlowercase: Lowercase,
                  PLUGIN_CONST: Uppercase,
                  PluginName: pluginName,
                  pluginslug: Slug,
                  YourName: authorName,
                  YourURL: url
                }

                var result = content.replace(
                  /YourPlugin|PluginClassName|pluginslug|pluginlowercase|PLUGIN_CONST|PluginName|YourName|YourURL/gi,
                  function (matched) {
                    console.log('👉 DBG: Match found....')
                    return mapObj[matched]
                  }
                )

                writeFile(file, result, 'utf8', function (err) {
                  if (err) return console.log(err)
                  console.log('✅ File:(' + file + ')' + ' => Renamed')
                })
              })

              console.log(`
                      ___   ___   ___   ___   ___   ________   ___   ___   ___   ___   ___   ___ 
                    || H ||| e ||| l ||| l ||| o |||        ||| W ||| o ||| r ||| l ||| d ||| ! ||
                    ||___|||___|||___|||___|||___|||________|||___|||___|||___|||___|||___|||___||
                    |/___\\|/___\\|/___\\|/___\\|/___\\|/________\\|/___\\|/___\\|/___\\|/___\\|/___\\|/___\\|
                                                                                                                  
                    All File Processed Successfully...your Plugin is ready to be developed! 🏗
                    Now run "npm run dev" and activate your plugin in Wordpress/Plugins list.
                    Enjoy ✌️...Made by Alan Ristić
              `)
            }
          })
          .catch((err) => {
            console.error('😵 Error searching for files:', err)
          })

        // TODO: REMOVE yaml config file, likely not needed
        // unlink('_config.yml', (err) => {
        //   if (err) {
        //     console.log('✅ No unused YAML file here, all good.')
        //     return
        //   }
        //   console.log('✅ Unused file removed, all good.')
        // })

        terminal.close()
      })
    })
  } else {
    var suggestion = pluginName.replace(/-/g, ' ')
    console.log(
      "⚠️ Warning: Please don't use hyphen. You may use " + suggestion + ' as your plugin name'
    )
    console.log('⚠️ Please run again "node alfred" and enter a unique plugin name.')
    terminal.close()
  }
})
