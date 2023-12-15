import sys
import json

arguments = sys.argv[1:]

def sum (num1,num2):
    return num1+num2



data = {"result":sum(3,4),"idiot":True}
print(json.dumps(data))
