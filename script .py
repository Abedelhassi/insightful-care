import requests
import hmac
import hashlib
import time
import subprocess
DT_API_URL = "https://darktrace.example.com"
DT_API_TOKEN = "YOUR_API_TOKEN"
DT_API_SECRET = "YOUR_API_SECRET"

SUSPICIOUS_IP = "1.2.3.4"
RISK_THRESHOLD = 0.7

def sign_request(token, secret, timestamp):
    message = f"{token}\n{timestamp}"
    return hmac.new(
        secret.encode(),
        message.encode(),
        hashlib.sha256
    ).hexdigest()

def check_ip_risk(ip):
    timestamp = str(int(time.time()))
    signature = sign_request(DT_API_TOKEN, DT_API_SECRET, timestamp)

    headers = {
        "DTAPI-Token": DT_API_TOKEN,
        "DTAPI-Date": timestamp,
        "DTAPI-Signature": signature,
        "Content-Type": "application/json"
    }

    payload = {"query": {"ip": ip}}

    r = requests.post(
        f"{DT_API_URL}/modelbreaches",
        headers=headers,
        json=payload,
        timeout=10
    )
    r.raise_for_status()
    return r.json()

def iptables_block(ip):
    try:
        subprocess.run(
            ["iptables", "-C", "INPUT", "-s", ip, "-j", "DROP"],
            check=True,
            stdout=subprocess.DEVNULL,
            stderr=subprocess.DEVNULL
        )
        print(f"[=] IP {ip} already blocked")
    except subprocess.CalledProcessError:
        subprocess.run(
            ["iptables", "-A", "INPUT", "-s", ip, "-j", "DROP"],
            check=True
        )
        print(f"[!] IP {ip} blocked via iptables")

def main():
    try:
        result = check_ip_risk(SUSPICIOUS_IP)
        score = result.get("riskScore", 0)

        print(f"[+] IP: {SUSPICIOUS_IP} | Risk: {score}")

        if score >= RISK_THRESHOLD:
            print("🚨 Threat detected → Blocking IP")
            iptables_block(SUSPICIOUS_IP)
        else:
            print(" IP is safe")

    except Exception as e:
        print(" Error:", e)

if__name__ == "__main__":
    main()
