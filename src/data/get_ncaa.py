import json
import os
import requests

try:
    cfdb_key = os.environ['CFDBKEY']
except:
    raise KeyError('Please save your collegefootballdata.com key in the environment variable "CFDBKEY"')
headers = {
    'accept': 'application/json',
    'Authorization': f'Bearer {cfdb_key}',
}

response = requests.get('https://api.collegefootballdata.com/teams/fbs', headers=headers)
data = response.json()
for i, d in enumerate(data):
    new_d = {
        **{k: d[k] for k in ['school', 'mascot', 'conference', 'color', 'id']},
        **{k: d['location'][k] for k in ['latitude', 'longitude', 'state', 'city']}
    }
    new_d['alt_color'] = d['alternateColor']
    data[i] = new_d
json.dump(data, open('ncaa.json', 'w'))