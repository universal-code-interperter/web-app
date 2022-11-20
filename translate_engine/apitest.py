import requests

url = "https://ls5f7275p37p4yp4x3h2evzsyu0wlhny.lambda-url.us-west-2.on.aws/"

code = 'importar testing\n\na = entrada()\n\nsi a == "y o para" y Falso:\n    imprimir(a)\nmas:\n    imprimir("imprimir")\n\n'

data = requests.post(url, json={"code": code, "language": "es"})
print(data.json())