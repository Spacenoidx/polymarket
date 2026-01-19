import requests

def fetch_data(url):
    try:
        response = requests.get(url)
        response.raise_for_status()  # Raise an error for bad responses
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"An error occurred: {e}")
        return None 

url = "https://gamma-api.polymarket.com/events?active=true&closed=false&limit=5"


data = fetch_data(url)
for datum in data:
    print("Market Title: ", datum["title"])
    print("Description: ", datum["description"])
    for key, item in datum.items():
        if key == "markets":
            print("Available Markets:")
            print("_________________________________")
            print("\n")
            for market in item:
                for m_key, m_item in market.items():
                    print(f"  {m_key}: {m_item}", end="\n")
                print("\n"*2)
        else:
        
            print(f"{key}: {item}", end="\n")
            print("\n"*2)
        
    # print("24h Volume: ", datum["volume24h"])
    # for key , value in datum.items():
    #     print(f"{key}: {value}")
    # print("\n"*2)
    