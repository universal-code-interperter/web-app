# line = "y ;adsfa;lkjdsf y y int"

# def find_all(a_str, sub):
#     start = 0
#     while True:
#         start = a_str.find(sub, start)
#         if start == -1: return
#         yield start
#         start += len(sub)

# for index in find_all(line, 'y'):
#     print(index)
    
output = ""
with open("spanishMessage.txt", "r") as file:
    for line in file:
        # output += line.strip('\n') + "\\n"
        output += line

import json

print(json.dumps(output))


print(output)