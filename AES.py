import sys
from Crypto.Cipher import AES
from Crypto.Util import Padding
from cryptography.fernet import Fernet


def completeEncryption(key_AES, iv, data, fernet_obj):
    cipher = AES.new(key_AES, AES.MODE_CBC, iv)
    ciphered_text_lvl1 = cipher.encrypt(Padding.pad(data, AES.block_size))
    ciphered_text_lvl2 = fernet_obj.encrypt(ciphered_text_lvl1)
    return ciphered_text_lvl2


def completeDecryption(key_AES, iv, encrypted_data, fernet_obj):
    cipher = AES.new(key_AES, AES.MODE_CBC, iv)
    ciphered_text_lvl1 = fernet_obj.decrypt(encrypted_data)
    result = Padding.unpad(cipher.decrypt(ciphered_text_lvl1),AES.block_size)
    return result


with open('passwords.bin', 'rb') as reader:
    iv = reader.read(16)
    key_AES = reader.read(32)
    key_fernet = reader.read(44)

def encrypt(data):
    encrypted = []
    fernet_obj = Fernet(key_fernet)
    for element in data: 
        temp = element.encode()
        el = completeEncryption(key_AES, iv, temp, fernet_obj)
        encrypted.append(el.decode())
    return encrypted

def decrypt(data):
    decrypted = []
    fernet_obj = Fernet(key_fernet)
    for element in data: 
        temp = element.encode()
        el = completeDecryption(key_AES, iv, temp, fernet_obj)
        decrypted.append(el.decode())
    return decrypted


def merge_until_comma(lst):
    result = []
    current_string = ""
    for item in lst:
        if "," in item:
            current_string += item
            result.append(current_string)
            current_string = ""
        else:
            current_string += item
    if current_string:
        result.append(current_string)
    return result


if(sys.argv[1] == "encrypt"):
    print(encrypt(merge_until_comma(sys.argv[2])))
elif(sys.argv[1] == "decrypt"):
    print(decrypt(merge_until_comma(sys.argv[2])))
