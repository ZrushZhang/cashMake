import json
import unittest

from app import create_app
from app import db
from models import Bank


class FlaskClientTest(unittest.TestCase):

	def setUp(self):
		self.app = create_app('default')
		self.app_context = self.app.app_context()
		self.app_context.push()
		db.create_all()
		Bank.generate_fake()
		self.client = self.app.test_client(use_cookies=True)

	def tearDown(self):
		db.session.remove()
		db.drop_all()
		self.app_context.pop()

	def test_home_page(self):
		response = self.client.get("http://127.0.0.1:5000/operations/bank")
		jsonRep = response.get_data(as_text=True)
		# print("response: %s" % jsonRep)
		data = json.loads(jsonRep)
		self.assertTrue(data['result']['status'] == 'True')
