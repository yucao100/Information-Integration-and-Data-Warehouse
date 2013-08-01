import re
import nltk
import numpy as np
from collections import Counter
from nltk import SnowballStemmer
from nltk.tag import pos_tag 
from nltk.tokenize import word_tokenize 
from nltk.tokenize import RegexpTokenizer

#MUST DOWNLOAD WORDNET EXTRA FOR NLTK FIRST
from nltk.corpus import wordnet
from nltk.stem.wordnet import WordNetLemmatizer

#Initialize objects
tokenizer = RegexpTokenizer(r'\w+')
lmtzr = WordNetLemmatizer()
stemmer = SnowballStemmer("english")


#----------Database options---------------
#Edit this section to alter database source
import MySQLdb as mdb

con = mdb.connect('localhost', 'speak', 
    'cs220lab', 'imageclef2013');

cur = con.cursor()

cur.execute("SELECT Caption FROM FIGURE")
#------------------------------------------

with open('terms.txt') as f:
    vocab = f.readlines()
outfile = open('output-FINAL_PRES.txt', 'w')
outfile2 = open('output2-FINAL_PRES.txt', 'w')


rows = cur.fetchall()
final=[]
final2=[]
i=-1

output = np.zeros((2000,307695))

for row in rows:
	i=i+1
	if i%100==0:
		print i
	tagged =[]
	nouns=[]
	listed=[]
	roots=[]
	passage = str(row)

#Tokenize individual terms
	tokens = tokenizer.tokenize(passage)
	#if i<7:
		#for token in tokens:			
			#print token
		#print '\n'
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

	for noun in nouns:
		   listed.append(noun[0])


	#Removes plural endings
	for full_term in listed:
		roots.append(lmtzr.lemmatize(full_term))

#For each noun, check each vocab word.  If match, add index of word (0-1999) to final array

	for word in vocab:
		for root in roots:
	   		if word.startswith(root): #Dang endline characters, this is basically 'word ==' root
				final.append(vocab.index(word))
				output[vocab.index(word)][i]=1
				break

#Keywords in reverse order (per caption) for second output file
	for word in reversed(vocab):
		for root in roots:
	   		if word.startswith(root):
				final2.append(vocab.index(word))
				break


	#This code is ONLY for the basic DBM
	#File format WILL NOT match that of the multi-modal DBM
					

np.save("test_out_FINAL_PRES.npy",output)

for indexed in final:
	outfile.write('%.18e' % indexed + '\n')

for indexed2 in final2:
	outfile2.write('%.18e' % indexed2 + '\n')

outfile.close()

