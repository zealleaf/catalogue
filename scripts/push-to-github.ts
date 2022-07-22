import shell from 'shelljs'
const msg = process.argv[2] || 'auto commit'
const exec = shell.exec
const echo = shell.echo
const exit = shell.exit

if (exec('git add .').code !== 0) {
  echo('error: git add failed!')
  exit(1)
}

if (exec(`git commit -m "${msg}" `).code !== 0) {
  echo('error: git commit failed!')
  exit(1)
}

if (exec('git push ').code !== 0) {
  echo('error: git push failed!')
  exit(1)
}

exec(`echo push success`)
