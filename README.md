# EDII V2.0



1) If Memory Error:  export NODE_OPTIONS=--max_old_space_size=8192
In Windows
1) node --max_old_space_size=8192 ./node_modules/@angular/cli/bin/ng serve


## For Alpha
1) ng build  --aot=true --configuration production
2) cd dist/
3) aws s3 sync . s3://aikube.io


ng build  --aot=true --configuration production && cd dist/ && aws s3 sync . s3://aikube.io