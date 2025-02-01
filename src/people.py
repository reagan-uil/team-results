import os

checknames=0
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
def formatPlace(place):
	if place=="1" or place=="21" or place=="31":
		place+="st"
	elif place=="2" or place=="22" or place=="32":
		place+="nd"
	elif place=="3" or place=="23" or place=="33":
		place+="rd"
	else:
		place+="th"
	return place
	
def rep(s): 
	s = s.replace("GOLD", gold)
	s = s.replace("SILVER", silver)
	s = s.replace("BRONZE", bronze)
	s = s.replace("OTHER", other)
	return s

names = set()
walloffame={}
info = list(map(str.strip, open("src/info.txt", "r").readlines()))
team_index = info.index("tres = [")
start_idx = info.index("res = [")
for i in range(start_idx+1, len(info)-1):
	s = info[i][12:-3] # s is all rows of res
	s = s.split("|")
	for x in s: # x is all names
		colon_idx = x.find(":")
		x = x[:colon_idx]
		names.add(x)
template = open("src/template.html", "r").readlines()

os.chdir("profiles")
for s in names:
	checknames += 1
	file_name = '-'.join(map(str, s.lower().split(" ")))
	f = open(file_name + ".html", "wb")
	txt = ''.join(map(str, template))
	txt = txt.replace("(Name)", s)

	go, si, br, ot, total = 0, 0, 0, 0, 0
	comp, res = [], [] # comp is all competitions, res is all results
	for i in range(start_idx+1, len(info)-1):
		if s in info[i]:
			comp.append(info[i][2:9])
			SI = info[i].find(s) #starting index
			FI = info[i].find("|", SI) #final index
			if FI == -1:
				FI = info[i].find("\"", SI)

			ev_res = info[i][SI + len(s) + 2: FI].strip() #raw individual results
			results=ev_res.split(", ")
			for x in results:
				if (len(x)>2):
					x=x[0]
				if x=="1":
					go+=1
					total+=1
				if x=="2":
					si+=1
					total+=1
				if x=="3":
					br+=1
					total+=1
				if x=="4" or x=="5" or x=="6":
					ot+=1
					total+=1
			counter=0
			for i in range(len(results)):
				if len(results[i])>2:
					counter-=1
				else:
					results[i]=formatPlace(results[i])
				if (counter==0):
					results[i]+=" Districts"
				if counter==1:
					results[i]+=" Regionals"
				if counter==2:
					results[i]+=" State"
				counter+=1
			res.append(results)
			
	for cidx in range(len(comp)): #loops through all competitions person took part in
		c = comp[cidx]
		for i in range(team_index+1, start_idx-2):
			if c in info[i]:
				ev_te_res = info[i][12:info[i].find("]")-1]
				results=ev_te_res.split(",")
				for x in results:
					if (len(x)>2):
						x=x[0]
					if x=="1":
						go+=1
						total+=1
					if x=="2":
						si+=1
						total+=1
					if x=="3":
						br+=1
						total+=1
					
				counter=0
				for i in range(len(results)):
					if (results[i]==""):
						results.pop(i)
						continue
					results[i]=formatPlace(results[i])	
					results[i]+=" Team"
					if (counter==0):
						results[i]+=" Districts"
					if counter==1:
						results[i]+=" Regionals"
					if counter==2:
						results[i]+=" State"
					counter+=1
				for x in results:
					res[cidx].append(x)

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
		txt_res += ": " 
		for j in range(len(res[i])):
			txt_res += res[i][j]
			if j != len(res[i]) - 1:
				txt_res += ", "
		txt_res += "</li>\n"
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

print(checknames, "people processed")