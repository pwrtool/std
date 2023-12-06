#!/bin/bash

current_directory=`pwd`

# Run the script from the directory it is in
cd "$(dirname "$0")"

echo "hello world!"
echo $1
