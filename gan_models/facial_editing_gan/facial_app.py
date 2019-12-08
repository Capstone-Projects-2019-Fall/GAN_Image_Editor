
from flask import Flask, request
from flask_restful import Resource, Api
from flask_cors import CORS

import numpy as np

import test_slide
import facial_server


facial_server.kill()
facial_server.start()

app = Flask(__name__)
api = Api(app)

CORS(app)

class facialGAN(Resource):
    def get(self, url, image_file_name,  params, model_type):
        url = url.replace("customDelim", "/")
        params = params.split("+")

        test_att = params[0]
        n_slide = int(params[1])
        image_labels = []
        model_type = int(model_type)

        for x in params[2]:
            image_labels.append(int(x))

        image_labels = np.asarray(image_labels)
        image_labels = np.where(image_labels==0, -1, image_labels)
        print("url")
        return  {'data': test_slide.runModel(url, image_file_name, test_att, n_slide, image_labels, model_type)}	

api.add_resource(facialGAN, '/facial/<url>/<image_file_name>/<params>/<model_type>')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=7010)
