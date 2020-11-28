const fs = require('fs');
const process = require('process');
const axios = require('axios');

// ******************************************************
// read file
// ******************************************************
function handleInput(path) {
  fs.readFile(path, 'utf8', function(err, data) {
    if (err) {
      console.error(`Error reading ${path}: ${err}`);
      process.exit(1);
    } else {
      lines = data.split(/\r?\n/);  // split the data string on newline characters
      lines.forEach(line => {
        if (line !== '') {
          out = extractStr(line);     // get hostname (which will be the output file name)
          webCat(line, out);   // write contents of the url to text file
        }
      })
    }
  });
}


// ******************************************************
// read page at URL
// ******************************************************

async function webCat(url, out) {
  try {
    let res = await axios.get(url);
    handleOutput(res.data, out)
  } catch (err) {
    console.error(`Couldn't download ${url}: ${err}`);   // download error
  }
}

// ******************************************************
// helper to extract hostname (or other string) from url
// ******************************************************
function extractStr(url) {

  // calc first argument to slice
  let dblSlashIdx = url.indexOf("//")
  dblSlashIdx = dblSlashIdx === -1 ? 0 : dblSlashIdx + 2;  // WORKS

  // calc second argument to slice
  let end;
  if (url.indexOf("/", dblSlashIdx) === -1) {
    end = url.length + 1;
  } else {
    end = url.indexOf("/", dblSlashIdx);
  }
  
  // extract desired string using slice
  const str = url.slice(dblSlashIdx, end);
  return str;
} 

// ******************************************************
// write file
// ******************************************************

function handleOutput(text, out) {
  fs.writeFile(out, text, 'utf8', function(err) {
    if (err) {
      console.error(`Couldn't write ${out}: ${err}`);   // write error
    } else {
      console.log(`Wrote to ${out}`)
    }
  });
};


let file = handleInput(process.argv[2]);
extractStr("https://nodejs.org/api/console.html");