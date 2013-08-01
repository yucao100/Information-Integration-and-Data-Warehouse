import re
import nltk
import pickle
from collections import Counter
from nltk import SnowballStemmer
#from nltk.corpus import brown
from nltk.tag import pos_tag 
from nltk.tokenize import word_tokenize 
from nltk.tokenize import RegexpTokenizer

#MUST DOWNLOAD WORDNET EXTRA FOR NLTK FIRST
#nltk.download()
from nltk.corpus import wordnet

#-----------
from nltk.stem.wordnet import WordNetLemmatizer

#Initialize objects
tokenizer = RegexpTokenizer(r'\w+')
lmtzr = WordNetLemmatizer()
stemmer = SnowballStemmer("english")


#----------Database options---------------
#Edit this section to alter database source
import MySQLdb as mdb

con = mdb.connect('10.48.11.75', 'speak', 
    'cs220lab', 'imageclef2013');

cur = con.cursor()

cur.execute("SELECT Caption FROM FIGURE")
#------------------------------------------

f = open('vocab.txt', 'w')
g = open('terms.txt', 'w')

rows = cur.fetchall()

final_b=[]
i=0

for row in rows:
	i=i+1
	print i
	tagged =[]
	nouns=[]
	newtags=[]
	final_a=[]

	passage = str(row)
	#print passage

#Tokenize individual terms
	tokens = tokenizer.tokenize(passage)

#Drop case
	lowered = [word.lower() for word in tokens]

#Tag parts of speech to remove non-nouns
	tagged= pos_tag(lowered) 

#Loop to remove all but nouns from the data
#Nested loops remove even more specific data anamolies [1-letter tokens, etc] 
#and should be extended to meet the needs of other datasets

	for tag in tagged:
	   if tag[1].startswith('N'):
			if len(tag[0]) > 1:
				if (len(tag[0]) != 3):
					nouns.append(tag)
				elif (tag[0][0] != 'x'):   #remove messy unix characters
					nouns.append(tag)

#Add nouns (string only) to final counting list
#(Clunky, I know, but I couldn't find a better way to separate the tuple)

	for noun in nouns:
	   final_a.append(noun[0])

#Removes plural endings
	for fine in final_a:
		final_b.append(lmtzr.lemmatize(fine))
#End loop

word_counts = Counter(final_b) #counts the number of times each word appears

top2000 = word_counts.most_common(200)

j=0
for topword, count in top2000:
	f.write(str(j) + ' ' + topword + ' ' + str(count) + '\n')
	g.write(topword + '\n')
	j=j+1


