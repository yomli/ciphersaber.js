/*
 * Copyright (c) 2015 Guillaume Litaudon
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 * 
 * If we meet some day, and you think this stuff is worth it, you can buy me a
 * beer in return.
 *
 * Simple implementation of the CipherSaber-2 algorithm by Arnold Reinhold
 * <arnold@iecc.com>.
 * More info: http://ciphersaber.gurus.org/
 *
 * Usage:
 * var encryptedText = CipherSaber.encrypt(someText, aPassword, aNumber);
 * var decryptedText = CipherSaber.decrypt(someText, aPassword, aNumber);
 *
 * @author		Guillaume Litaudon
 * @version		1.10, 19/04/2015  
 */
 
 var CipherSaber = new function() {

 	this.message = "Hello World!";
 	this.password = "password";
 	this.cycles = 20;
 	this.seed = [];
 	this.ruby = [];
 	this.light = [];
 	this.output = [];
 	this.button = [];


 	this.refractor = function() {
 		var i = 0;
 		var j = 0;

 		for (n = 0; n < this.message.length; n++) {

 			i = parseInt(i + 1) % 256;
 			j = parseInt(j + this.light[i]) % 256;

 			var tmp = this.light[i];
 			this.light[i] = this.light[j];
 			this.light[j] = tmp;

 			var k = parseInt(this.light[i] + this.light[j]) % 256;

 			this.output[n] = (this.light[k] ^ this.message[n]);
 		}
 	};

 	this.emission = function() {
 		var j = 0;

 		for (i = 0; i < 256; i++)
 			this.light[i] = i;

 		for (n = 1; n <= this.cycles; n++) {
 			for (i = 0; i < 256; i++) {
 				j = parseInt(j + this.light[i] + this.ruby[i]) % 256;
 				var tmp = this.light[i];
 				this.light[i] = this.light[j];
 				this.light[j] = tmp;
 			}
 		}

 	};

 	this.pushButton = function() {
 		var shape = this.password.concat(this.seed);
 		for (i = 0; i < 256; i++) {
 			var tmp = shape.shift();
 			this.ruby[i] = tmp;
 			shape.push(tmp);
 		}
 	};

 	this.encrypt = function(text, key, iv) {
 		this.message = this.toByte(text);
 		this.password = this.toByte(key);
 		this.cycles = iv; 

 		for (i = 0; i < 10; i++) {
 			this.seed[i] = Math.round(Math.random() * 256);
 		}

 		this.pushButton();
 		this.emission();
 		this.refractor();

 		var crypted = "";
 		for (i = 0; i < this.seed.length; i++) {
 			crypted += this.toHex(this.seed[i]) + " ";
 		}
 		for (i = 0; i < this.output.length; i++) {
 			crypted += this.toHex(this.output[i]) + " ";
 		}

 		return crypted;

 	};

 	this.decrypt = function(text, key, iv) {
 		this.password = this.toByte(key);
 		this.message = text.split(" ");

 		for (i = 0; i < this.message.length; i++) {
 			this.message[i] = parseInt(this.message[i], 16);
 			if (isNaN(this.message[i])) this.message.splice(i, 1);

 		}

 		this.seed = this.message.splice(0, 10);

 		this.pushButton();
 		this.emission();
 		this.refractor();

 		var decrypted = "";
 		for (i = 0; i < this.output.length; i++) {
 			decrypted += String.fromCharCode(this.output[i]);
 		}
 		return decrypted;

 	};

 	this.toByte = function(str) {
 		var byt = [];
 		for (i = 0; i < str.length; i++)
 			byt[i] = str.charCodeAt(i);
 		return byt;
 	};

 	this.toHex = function(num) {
 		var hex = Number(num).toString(16);
 		while (hex.length < 2)
 			hex = "0" + hex;
 		return hex;
 	};
 }