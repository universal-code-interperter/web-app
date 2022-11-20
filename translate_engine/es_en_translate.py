keywordMap = {
    'y' : 'and',
    'como': 'as',
    'asevera':'assert',
    'rompa':'break',
    'clase':'class',
    'continuar':'continue',
    'mas:':'else:',
    'más:': 'else:',
    'excepto':'except',
    'Falso':'False',
    'Falsa':'False',
    'finalmente': 'finally',
    'para':'for',
    'de':'from',
    'si':'if',
    'global':'global',
    # There are like 20 more in the doc that is missed LMFAO

    'imprimir': 'print',
    'entrada':'input',
    'abrir': 'open',
    'gama':'range',
    'enumerar':'enumerate',
    'formato':'format',
}

# Generator function to find the first index of all occurances of sub in a_str

def find_all(a_str, sub):
    start = 0
    while True:
        start = a_str.find(sub, start)
        if start == -1: return
        yield start
        start += len(sub)

def surroundedByQuotations(theLine, theIndex):
    #count the number of quotes from the beginning of the line to the first index of the keyword
    i = 0
    quotemarkCounter = 0
    while i < theIndex:
        if theLine[i] == '"':
            quotemarkCounter+=1
        i+=1
    if quotemarkCounter%2 == 0: # then translate
        return True
    else: # then don't translate
        return False

translatedCode = ''

with open('spanishMessage.txt', 'r') as f:
    for line in f:
        trailing = ''
        for c in line:
            if c == ' ':
                trailing += c
            else:
                break
        line = line.strip() #remove the leading and trailing spaces
        firstHash = line.find('#') # find the first hash in the line
        if firstHash < 0: #if the first '#' doesn't exist, then set it to a large number
            firstHash = 5000000
        
        # print(line)
        #print(firstHash)
        lineLength = len(line)
        #print(lineLength)

        #compare the string to each key in the hashmap
        for key in keywordMap:
            # print(key)
            for index in find_all(line, key): #find the occurence of key in the line
                print("we found key:" + key + " at index " + str(index) + " first hash is: " + str(firstHash))
                keyLength = len(key) # get the length of the key
                lastCharacterIndex = index + keyLength - 1 #get the index of the last character 
                
                if index > firstHash: #the line is a comment, then the skip- go the the line of the .txt file
                    print("The occurence is after a hash")
                    #MessageTranslated += str(line)
                    break
                if index != 0 and line[index - 1] != ' ':# if the occurence is not at index zero and the char before is not a space, then break because it is not a keyword
                    print("This keyword is a substring- it as a character before")
                    #MessageTranslated += str(line)
                    break
                goodLastChar = [' ', ':', '(']
                if lastCharacterIndex != lineLength-1 and line[lastCharacterIndex + 1] not in goodLastChar: #if the last index and there is something after the word, hence it is part of something else, then skip
                    print("The keyword is part of something else")
                    #MessageTranslated += str(line)
                    break
                if surroundedByQuotations(line, index): #if it returns treu then translate keyword
                    print("the keyword is not surronded by a quote")
                    line = line.replace(key,keywordMap[key])
                    #MessageTranslated += str(line)
                    break
                else:
                    line = line.replace(key,keywordMap[key])
                    #MessageTranslated += str(translatedLine)
            #if(key in line):
                #print("we found a match- so we quit")
                #quit()
        translatedCode += str(trailing + line + "\n")

print("\nThe translated output is: \n"+ translatedCode)

import json

print(json.dumps(translatedCode))

# print(hashMap['shit'])

# for key in hashMap:
#     print(key, hashMap[key])
#for key in hashMap:
#    lineLength = 
#    print(key,hashMap[key])

#for key in hashMap:
   # print(key,hashMap[key])
    #x = 'si ur mom is gay'.replace(key,hashMap[key])
    #print(x)
