Project transfered to https://codeberg.org/yomli/ciphersaber.js

# CipherSaber.js

This is a very simple implementation of the CipherSaber-2 algorithm by Arnold Reinhold (arnold@iecc.com).
More info: http://ciphersaber.gurus.org/

## Usage
``` javascript
var encryptedText = CipherSaber.encrypt(someText, aPassword, aNumber);

var decryptedText = CipherSaber.decrypt(someText, aPassword, aNumber);
```

Output
``` plaintext
75 34 8e 15 d0 3a 39 31 ba a4 f7 19 01 80 a8

Hello
```
See [example.html](example.html) for more informations.

### CipherSaber.encrypt(someText, aPassword, aNumber)
Returns an encrypted text.

`someText` must be a string
`aPassword` must be a string, up to 246 characters in length
`aNumber` must be number between 1 and 100, the higher the better (default: 20)

### CipherSaber.decrypt(someText, aPassword, aNumber)
Returns a decrypted text.

`someText` must be a string in hex
`aPassword` must be a string, up to 246 characters in length
`aNumber` must be number between 1 and 100, the higher the better (default: 20)

## Warning
Please do not use this for anything important. In fact, don't use this at all. [Go write your own](http://ciphersaber.gurus.org/).

## License
Licensed under the terms of the MIT-Beerware license.
See the [LICENSE](LICENSE) file for license rights and limitations.
