#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
# npm run docs:build
yarn build
# 进入生成的文件夹
cd docs/.vuepress/dist

#ceshi
# 如果是发布到自定义域名
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'auto deploy'

# 如果发布到 https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.
# 如果发布到 https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:jinjun1994/Frontend-Knowledge-Base.git master:gh-pages

cd -
