
def fast_mod_exp(b, n, m):
    n = format(n, "b") # convert n to binary
    x = 1
    power = b % m
    steps = []
    for i in range(len(n)-1, -1, -1):
        bit = n[i]
        if bit == "1":
            a=x
            x = (x * power) % m

            steps.append(f"i={abs(i-len(n)+1)} : Because a_{abs(i-len(n)+1)} =1, we have x=({a} * {power})mod{m} = {x} and power={power*power%645}")
        else:
            
            steps.append(f"i={abs(i-len(n)+1)} : Because a_{abs(i-len(n)+1)} =0, we have x={x} and power={power*power%m}")
        power = (power * power) % m
    return x, steps