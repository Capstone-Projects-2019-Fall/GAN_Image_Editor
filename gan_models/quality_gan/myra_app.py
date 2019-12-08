import qualityGANModel				#You can change this to whatever file you are using
import myraServerStuff
from flask import Flask, request
from flask_restful import Resource, Api
from flask_cors import CORS

myraServerStuff.kill()
myraServerStuff.start()

app = Flask(__name__)
api = Api(app)

CORS(app)

class qualityGAN(Resource):
	def get(self, url, file_name, model_type):
		url = url.replace("customDelim", "/")
		return {'data': qualityGANModel.runModel(url, file_name, model_type)}	

api.add_resource(qualityGAN, '/quality/<url>/<file_name>/<model_type>')
if __name__ == '__main__':
	app.run(host='0.0.0.0', port=8000)		#You can set this to any port within the range of 8000-8999
