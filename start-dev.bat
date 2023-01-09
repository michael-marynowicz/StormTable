start cmd /K "cd ./backend & webstorm . & exit"
timeout 10
start cmd /K "cd ./mobile & webstorm . & exit"
timeout 3
start cmd /K "cd ./table & webstorm . & exit"