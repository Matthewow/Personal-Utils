def some_id(length):
    return "".join(random.choice(string.ascii_letters) for x in range(length))
