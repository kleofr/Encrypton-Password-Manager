from Crypto.Random import get_random_bytes
from cryptography.fernet import Fernet
# KEY FOR AES (LVL1)
key_AES = get_random_bytes(32)
# KEY FOR FERNET (LVL2)
key_fernet = Fernet.generate_key()
# IV FOR RANDOMIZING STATIC CONVERSION
iv = get_random_bytes(16)

fernet_obj = Fernet(key_fernet)

with open('passwords.bin', 'wb') as f:
    f.write(iv+key_AES+key_fernet)

