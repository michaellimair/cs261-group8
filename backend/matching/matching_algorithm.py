#!/usr/bin/env python
# coding: utf-8


import random
import numpy as np
import pandas as pd
random.seed(101)





'''For the language, business area and seniority columns, the answers are generated randomly from a given list with 
corresponding probabilities given by the p vector. Those probabilities are sometimes different for the mentor and the mentee 
to try to replicate the real world distribution of those answers. 
e.g. there is likely to be more mentors with higher seniority than mentees.

The problem with dividing by zero is now also fixed so even if the mentor/mentee choose no answer for a given question, the 
algorithm will still be able to calculate the compatibility score.'''






mentor = pd.DataFrame(np.random.randint(0, 2, size = (10000, 10)), columns = list("ABCDEFGHIJ"))

mentee = pd.DataFrame(np.random.randint(0, 2, size = (10000, 10)), columns = list("ABCDEFGHIJ"))

lang = ["English", "German", "Russian", "Chinese"]

lang_col_l = []
for x in range(10000):
    lang_col_l.append(np.random.choice(lang, p = [0.4, 0.4, 0.1, 0.1 ]))
lang_col = pd.Series(lang_col_l, name = "language")
lang_col = pd.DataFrame(lang_col)
mentor = pd.merge(left = mentor, left_index = True, right = lang_col, right_index = True)


lang = ["English", "German", "Russian", "Chinese"]


lang_col_l = []
for x in range(10000):
    lang_col_l.append(np.random.choice(lang, p = [0.4, 0.4, 0.1, 0.1 ]))
lang_col = pd.Series(lang_col_l, name = "language")
lang_col = pd.DataFrame(lang_col)
mentee = pd.merge(left = mentee, left_index = True, right = lang_col, right_index = True)


BusArea = ["CB", "IB", "PB", "DWS", "INFR", "TECH"]

BusArea_l = []
for x in range(10000):
    BusArea_l.append(np.random.choice(BusArea, p = [1/6, 1/6, 1/6, 1/6, 1/6, 1/6]))
BusArea = pd.Series(BusArea_l, name = "BusArea")
BusArea = pd.DataFrame(BusArea)
mentor = pd.merge(left = mentor, left_index = True, right = BusArea , right_index = True)


BusArea = ["CB", "IB", "PB", "DWS", "INFR", "TECH"]

col = []
for x in range(10000):
    col.append(np.random.choice(BusArea, p = [1/6, 1/6, 1/6, 1/6, 1/6, 1/6]))
BusArea = pd.Series(col, name = "BusArea")
BusArea = pd.DataFrame(BusArea)
mentee = pd.merge(left = mentee, left_index = True, right = BusArea , right_index = True)


Seniority = ["Analyst", "Assistant VP", "VP", "Senior VP", "Director"]

col = []
for x in range(10000):
    col.append(np.random.choice(Seniority, p = [0.5, 0.2, 0.15, 0.1, 0.05]))
Seniority = pd.Series(col, name = "Seniority")
Seniority = pd.DataFrame(Seniority)
mentee = pd.merge(left = mentee, left_index = True, right = Seniority , right_index = True)



Seniority = ["Analyst", "Assistant VP", "VP", "Senior VP", "Director"]

col = []
for x in range(10000):
    col.append(np.random.choice(Seniority, p = [0.1, 0.2, 0.3, 0.2, 0.2]))
Seniority = pd.Series(col, name = "Seniority")
Seniority = pd.DataFrame(Seniority)
mentor = pd.merge(left = mentor, left_index = True, right = Seniority , right_index = True)



col = []
for x in range(10000):
    col.append(np.random.choice(range(1,6), p = [1/5 ,1/5, 1/5, 1/5, 1/5]))
rank = pd.Series(col, name = "Rank")
rank = pd.DataFrame(rank)
mentor = pd.merge(left = mentor, left_index = True, right = rank , right_index = True)



col = []
for x in range(10000):
    col.append(np.random.choice(range(1,11), p = [1/10 ,1/10, 1/10, 1/10, 1/10, 1/10 ,1/10, 1/10, 1/10, 1/10]))
n_mentees = pd.Series(col, name = "N_mentees")
n_mentees = pd.DataFrame(n_mentees)
mentor = pd.merge(left = mentor, left_index = True, right = n_mentees , right_index = True)


def f1(row):
    if row["Seniority"] == "Director":
        return 5
    if row["Seniority"] == "Senior VP":
        return 4
    if row["Seniority"] == "VP":
        return 3
    if row["Seniority"] == "Assistant VP":
        return 2
    if row["Seniority"] == "Analyst":
        return 1

res = mentor.apply(lambda row: f1(row), axis = 1)
mentor["Seniority_num"] = res

res = mentee.apply(lambda row: f1(row), axis = 1)
mentee["Seniority_num"] = res



def match_score_it(menteeN, mentor, startpar = 0, par1 = 5, par2 = 7, par3 = 10, w1 =1, w2 =1, w3 =1):
   
    score = []
    
   
    me1 = mentee.iloc[[menteeN], startpar : par1].to_numpy()
    me2 = mentee.iloc[[menteeN], par1: par2].to_numpy()
    me3 = mentee.iloc[[menteeN], par2: par3].to_numpy()
    
    
 
    def count_ops(me_i):
        return np.count_nonzero(me_i == 1)
    
    me_n1 = count_ops(me1) 
    me_n2 = count_ops(me2) 
    me_n3 = count_ops(me3) 

    if me_n1 == 0:
        me_n1 +=1
    if me_n2 == 0:
        me_n2 +=1
    if me_n3 == 0:
        me_n3 +=1
   
    for i in range(0, len(mentor.index)):
        mr1 = mentor.iloc[[i], startpar : par1].to_numpy()
        mr2 = mentor.iloc[[i], par1 : par2].to_numpy()
        mr3 = mentor.iloc[[i], par2 : par3].to_numpy() 
        
        s1 = ((np.dot(me1.ravel(), mr1.ravel())/(me_n1)))  
        s2 = ((np.dot(me2.ravel(), mr2.ravel())/(me_n2))) 
        s3 = ((np.dot(me3.ravel(), mr3.ravel())/(me_n3)))
        
        st = (s1*w1 + s2*w2 + s3*w3)
        
        score.append(st) 
    
    matching_score = pd.Series(score)
    return ((matching_score - matching_score.min())/(matching_score.max() - matching_score.min()))


def filter_language(menteeN):
    mask = (mentor["language"] == (mentee.iloc[[menteeN], 10].to_string(index = False).replace(" ", "")))
    return mentor[mask]




def filter_BusArea(menteeN):
    mask = (mentor["BusArea"] != (mentee.iloc[[menteeN], 11].to_string(index = False).replace(" ", "")))
    return mentor[mask]


def filter_Seniority(menteeN):
    num = int(mentee.iloc[[menteeN], 13].to_string(index = False).replace(" ", ""))
    mask = (mentor["Seniority_num"] > num)
    return mentor[mask]


def master_filter(menteeN):
    num = int(mentee.iloc[[menteeN], 13].to_string(index = False).replace(" ", ""))
    
    mask = (mentor["language"] == mentee.iloc[[menteeN], 10].to_string(index = False).replace(" ", "")) & (mentor["BusArea"] != (mentee.iloc[[menteeN], 11].to_string(index = False).replace(" ", ""))) & (mentor["Seniority_num"] > num)
    return mentor[mask]

def reorder(data):
    return data.sort_values(by = ["score", "N_mentees", "Rank"], ascending = [False, True, False])




#Full function
def match(menteeN, startpar = 0, par1 = 5, par2 = 7, par3 = 10, w1 =1, w2 =1, w3 =1):
    
    temp = mentor
    
    temp = master_filter(menteeN)
    score = match_score_it(menteeN, temp)
    
    temp = pd.merge(left = temp, left_index = True, right = score.rename("score") , right_index = True)
    temp = reorder(temp)
    
    return temp.iloc[:10, 10: ]





