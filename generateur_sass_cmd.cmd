echo "sass --watch " > provisoir.txt
find . -name "index.php" | while read fname; do echo ${fname%/*}/assets/scss/app.scss:${fname%/*}/assets/css/style.css >> provisoir.txt; done

tr '\n' ' ' < provisoir.txt > sass_command.cmd
tr '\n' ' ' < provisoir.txt > sass_command.command

chmod +x sass_command.cmd
chmod +x sass_command.command

rm provisoir.txt

./sass_command.cmd