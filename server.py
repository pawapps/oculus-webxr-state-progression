import http.server, ssl

server_address = ("0.0.0.0", 4443)
httpd = http.server.HTTPServer(server_address, http.server.SimpleHTTPRequestHandler)
httpd.socket = ssl.wrap_socket(httpd.socket,
server_side=True,
certfile="localhost.pem",
ssl_version=ssl.PROTOCOL_TLSv1_2)
httpd.serve_forever()

# openssl req -new -x509 -keyout localhost.pem -out localhost.pem -days 365 -nodes