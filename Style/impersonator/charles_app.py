import styleGANModel				
import charlesServerStuff
from flask import Flask, request
from flask_restful import Resource, Api
from flask_cors import CORS

charlesServerStuff.kill()
charlesServerStuff.start()

app = Flask(__name__)
api = Api(app)

CORS(app)

class styleGAN(Resource):
	def get(self, url1, url2, model_type):
		url1 = url1.replace("customDelim", "/")
		url2 = url2.replace("customDelim", "/")
		#print("The string is: " + styleGANModel.runModel(url1, url2))
		#return('data': "Hello")	
		return {'data': styleGANModel.runModel(url1, url2, model_type)}	


api.add_resource(styleGAN, '/style/<url1>/<url2>/<model_type>')

#print('Here')
if __name__ == '__main__':
	app.run(host='0.0.0.0', port=9000)		
