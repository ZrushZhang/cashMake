# class SeleniumTestCase(unittest.TestCase):
# 	client = None
# 	app = None
#
# 	def __init__(cls, app):
# 		# super(SeleniumTestCase, cls).__init__(**kwargs)
# 		cls.app = app
#
# 	@classmethod
# 	def setUpClass(cls):
#
# 		try:
# 			cls.client = webdriver.Safari(port=5001)
# 		except:
# 			pass
#
# 		if cls.client:
# 			# create program
# 			cls.app_context = cls.app.app_context()
# 			cls.app_context.push()
#
# 			# create db
# 			db.create_all()
# 			Bank.generate_fake()
#
# 			# run bankmake program
# 			threading.Thread(target=cls.app.run).start()
#
# 	@classmethod
# 	def tearDownClass(cls):
# 		if cls.client:
# 			cls.client.get("http://127.0.0.1:5000/shutdown")
# 			cls.client.close()
#
# 			db.drop_all()
# 			db.session.remove()
#
# 			cls.app_context.pop()
#
# 	def setUp(self):
# 		if not self.client:
# 			self.skipTest("Web Browser not available")
#
# 	def tearDown(self):
# 		pass
#
# 	def get_banks(self):
#
# 		# show bank page
# 		self.client.get("http://127.0.0.1:5000/")
# 		self.assertTrue(re.search("zhangziran"), self.client.page_source)
#
# 		# click add button
# 		self.client.find_elements_by_id("bankAdd").click()
# 		self.assertTrue("bankForm", self.client.page_source)
#
# 		# add banks
# 		self.client.find_element_by_name("bankName").send_keys("ZHO")
# 		self.client.find_element_by_name("bankCity").send_keys("Beijing")
# 		self.client.find_element_by_name("bankAddress").send_keys("XiCheng District")
# 		self.assertTrue(re.search("true"), self.client.page_source)
