import json

demo_event = {
    "language": "es",
    "code": "importar testing\n\na = entrada()\n\nsi a == \"y o para\" y Falso:\n    imprimir(a)\nmas:\n    imprimir(\"imprimir\")\n\n"
}


class Translator:
    def __init__(self, language) -> None:
        allData = json.load(open('language_data.json', 'r'))
        self.language = language
        self.keywordMap = allData[language]['keywords']
        self.functionMap = allData[language]['functions']

    @staticmethod
    def find_all(a_str, sub):
        # Generator function to find the first index of all occurances of sub in a_str
        start = 0
        while True:
            start = a_str.find(sub, start)
            if start == -1:
                return
            yield start
            start += len(sub)

    @staticmethod
    def surroundedByQuotations(theLine, theIndex):
        #count the number of quotes from the beginning of the line to the first index of the keyword
        i = 0
        quotemarkCounter = 0
        while i < theIndex:
            if theLine[i] == '"' or theLine[i] == "'":
                quotemarkCounter+=1
            i+=1
        if quotemarkCounter%2 == 0: # then dont translate
            return False
        else: # then translate
            return True

    @staticmethod
    def replaceCase(s, old, new, start):
        return s[:start] + new + s[start + len(old):]

    def handleLineCase(self, line, key, value, isFunc = False):
        lineLength = len(line)
        for index in self.find_all(line, key):
            keyLength = len(key)
            lastCharacterIndex = index + keyLength - 1

            if not isFunc and index != 0 and line[index-1] != ' ':
                continue

            if not isFunc and lastCharacterIndex != lineLength-1 and line[lastCharacterIndex+1] != ' ':
                continue

            goodLastCharacter = [' ', '(']
            if isFunc and lastCharacterIndex != lineLength-1 and line[lastCharacterIndex+1] not in goodLastCharacter:
                continue

            if self.surroundedByQuotations(line, index):
                continue

            line = self.replaceCase(line, key, value, index)
            return line
        
        return line
                

    def translate(self, code):
        translatedCode = ""
        for line in code.splitlines():
            # Deal with trailing whitespace
            trailing = ''
            for c in line:
                if c == ' ':
                    trailing += c
                else:
                    break

            line = line.strip()
            # Deal with ending comments
            firstHash = line.find('#') # find the first hash in the line
            line = line[:firstHash] if firstHash >= 0 else line

            ending = ""
            # Ending colon
            if len(line) and line[-1] == ':':
                line = line[:-1]
                ending = ':'

            for key in self.keywordMap:
                nline = ''
                while nline != line:
                    nline = line
                    line = self.handleLineCase(line, key, self.keywordMap[key])
            
            for key in self.functionMap:
                nline = ''
                while nline != line:
                    nline = line
                    line = self.handleLineCase(line, key, self.functionMap[key], True)
            

            translatedCode += str(trailing + line + ending + "\n")
        return translatedCode


def lambda_handler(event, context):
    translator = Translator(event['language'])
    code = translator.translate(event['code'])
    body = {
        "code": json.dumps(code)
    }
    # print(code)
    return {
        'statusCode': 200,
        'body': body
    }


# TESTING CODE FOR LOCAL TESTING
# if __name__ == "__main__":
#     print(lambda_handler(demo_event, None))
