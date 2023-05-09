Copy
#!/bin/bash

branch=$(git rev-parse --abbrev-ref HEAD | tr -d '\n')
tickets=''
if [ ${#branch} -gt 0 ]; then
  branch=${branch#*/}
  if [ ${#branch} -gt 0 ]; then
    split=(${branch//-/ })
    tickets="${split[0]}-${split[1]}: "
  fi
fi
read -p "Enter your commit message: ${tickets}" commit_message
commit_message="${tickets}${commit_message}"
git commit -m "$commit_message"


function gy(){
  branch=$(git rev-parse --abbrev-ref HEAD | tr -d '\n')
  tickets=''
  if [[ ${#branch} -gt 0 ]]; then
    branch=${branch#*/}
    if [[ ${#branch} -gt 0 ]]; then
      split=(${(s/-/)branch})
      tickets="${split[1]}-${split[2]}:"
    fi
  fi
  commit_message="${tickets} $@"
  git commit -m "${commit_message}"
}
