import os

gold, silver, bronze, other = "\U0001f947", "\U0001f948", "\U0001f949", "\U0001f3c5"
comp_conv = {
	"AC":"Accounting",
	"CL":"Calculator",
	"CO":"Computer Applications",
	"CS":"Computer Science",
	"CP":"Copy Editing",
	"CE":"Current Events",
	"EW":"Editorial Writing",
	"FW":"Feature Writing",
	"GM":"Mathematics",
	"HW":"Headline Writing",
	"NS":"Number Sense",
	"NW":"News Writing",
	"LC":"Literary Crit",
	"PO":"Poetry Interpretation",
	"PR":"Prose Interpretation",
	"RW":"Ready Writing",
	"SC":"Science",
	"SS":"Social Studies",
	"SP":"Spelling"
}

def rep(s): 
	s = s.replace("GOLD", gold)
	s = s.replace("SILVER", silver)
	s = s.replace("BRONZE", bronze)
	s = s.replace("OTHER", other)
	return s

names = set()
walloffame={}
info = list(map(str.strip, open("src/info.js", "r").readlines()))
team_index = info.index("var tres = [")
start_idx = info.index("var res = [")
for i in range(start_idx+1, len(info)-1):
	s = info[i][13:-3] # s is all rows of res
	print(s)
	if s[-1] == ',':
		s = s[:-1]
	s = s.split(" | ")
	for x in s: # x is all names
		colon_idx = x.find(":")
		x = x[:colon_idx]
		names.add(x)
template = open("src/template.html", "r").readlines()

os.chdir("profiles")
for s in names:
	file_name = '-'.join(map(str, s.lower().split(" ")))
	f = open(file_name + ".html", "wb")
	txt = ''.join(map(str, template))
	txt = txt.replace("(Name)", s)

	go, si, br, ot, total = 0, 0, 0, 0, 0
	comp, res = [], []
	for i in range(start_idx+1, len(info)-1):
		if s in info[i]:
			comp.append(info[i][2:9])
			SI = info[i].find(s) #starting index
			FI = info[i].find("|", SI) #final index
			if FI == -1:
				FI = info[i].find("\"", SI)

			ev_res = info[i][SI + len(s) + 2: FI].strip()
			res.append(ev_res)
			results=ev_res.split()
			for x in results:
				if x=="1st":
					go+=1
					total+=1
				if x=="2nd":
					si+=1
					total+=1
				if x=="3rd":
					br+=1
					total+=1
				if x=="4th" or x=="5th" or x=="6th":
					ot+=1
					total+=1
	for cidx in range(len(comp)):
		c = comp[cidx]
		for i in range(team_index+1, start_idx-2):
			if c in info[i]:
				ev_te_res = info[i][13:info[i].find("]")-1]
				ev_te_res = ', '.join(map(str, ev_te_res.split(" | ")))
				if len(ev_te_res) != 0:
					if ev_te_res[-2] == ',':
						ev_te_res = ev_te_res[:-2]
					if ev_te_res[-1] == ',':
						ev_te_res = ev_te_res[:-1]
					if ev_te_res[0] == ',':
						ev_te_res = ev_te_res[2:]
					res[cidx] += ", " + ev_te_res
				results=ev_te_res.split()
				for x in results:
					if x=="1st":
						go+=1
						total+=1
					if x=="2nd":
						si+=1
						total+=1
					if x=="3rd":
						br+=1
						total+=1
		if len(res[cidx]) != 0:
			if res[cidx][-2] == ',':
				res[cidx] = res[cidx][:-2]
			if res[cidx][-1] == ',':
				res[cidx] = res[cidx][:-1]
			if res[cidx][0] == ',':
				res[cidx] = res[cidx][2:]

	walloffame.update({s: total})
	walloffame=dict(sorted(walloffame.items(), key=lambda item: item[1], reverse=True))
	medals = [(gold * go), (silver * si), (bronze * br), (other * ot)]
	medals = ' '.join(map(str, medals)).split()
	txt_res = ""
	for med in medals:
		txt_res += "<h2>" + med + "</h2>\n"
	txt_res += "<br>"
	txt_res += "<ul>\n\t"
	for i in range(len(comp)):
		if i >= 0 and comp[i][:5] != comp[i-1][:5]:
			txt_res += "<br>\n"
		txt_res += "<li><b>" + comp[i][:5] + comp_conv[comp[i][5:]] + "</b>"
		if len(res[i]) >= 3: 
			txt_res += ": " + res[i] + "</li>\n"
	txt_res += "</ul>"
	
	txt = txt.replace("some crazy stuff", txt_res)

	f.write(rep(txt).encode())
os.chdir("../src")
template = open("woftemp.html", "r").readlines()
f = open("walloffame.html", "wb")
txt = ''.join(map(str, template))
txt_res=""
for key, value in walloffame.items():
	txt_res += "<tr><td><a href=\"../profiles/"+key.lower().replace(" ", "-") + ".html\">"+key+"</a></td><td>"+str(value)+"</td></tr>\n"
txt = txt.replace("some crazy stuff", txt_res)
f.write(txt.encode())