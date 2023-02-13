#!/usr/bin/env python
# coding: utf-8

# In[63]:


import pandas as pd
import re
import numpy as np
import nltk
nltk.download('punkt')
nltk.download('averaged_perceptron_tagger')
nltk.download('maxent_ne_chunker')
nltk.download('words')


# ### NLTK tag:

# JJ: Adjective
# 
# JJR: Adjective, comparative
# 
# JJS: Adjective, superlative
# 
# NN: Noun, singular or mass
# 
# NNS: Noun, plural
# 
# NNP: Proper noun, singular Phrase
# 
# NNPS: Proper noun, plural

# In[90]:


def Identification_Skills(df_memo):
    count=1 #Count for data rows             
    meta_blank, meta_adj,con=[],[],[] # container: for skills name, for adj, for unidentified names
    
    #Words that 100% need to be identified:        
    favlist=[ "Angular",'ASP','ADONISJS','AWS',"Backbone","Babel","C++","CSS","Cascading","D3",'DJANGO',"Ember",'ELIXIR','EXPRESS','FLASK',             "GraphQL","Gatsby",'GO', "HTML","Hypertext",'JAVA', "JAVASCRIPT","JQuery",'LARAVEL',             'METEOR','METEORJS','NESTJS','NODE',"Next",'PLAY','PHP','PYTHON',"POWERBI","Polymer","React","Redux",'RUBY',             'SPRING','SINATRA',"SQL","Svelte","TABLEAU","Three","TypeScript","Vue","Webpack"]
    
    def NLP_Processcing(meta_blank,meta_adj,i):
        blank,adj=[],[]
        x = nltk.word_tokenize(i)
        x = [i.upper() if i.upper() in favlist else i for i in x] #Make sure the common words are captured
        for tag in nltk.pos_tag(x):
            if "JJ" in tag[1]: # For Adj
                adj.append(tag[0])
            if "NNP" in tag[1]: # Most of the skills are tag "NNP"
                blank.append(tag[0])
            if "NNP" not in tag[1] and tag[0] in favlist: #Capturing those not "NNP" but need to be identify
                blank.append(tag[0])

        meta_adj += list(np.unique(adj)) #Catch unique value of each job description
        meta_blank += list(np.unique(blank))
    
    







    
    for i in df_memo["description"]:
        print(count)

        NLP_Processcing(meta_blank,meta_adj,i)
        

        #Find those words are frequently unidentified
        words = pd.DataFrame(nltk.word_tokenize(i))
        tt = words[~words[0].isin(blank)]
        
        for j in tt[0]:
            con.append(j)
        
        count+=1

    return meta_adj, meta_blank, con



def Aggregated_Analysis(con):
    #Unimportant Words for analysis:
    blocklist=['-','”','–','@','’','+','/','ACCOUNT','ACTALENT','ABILITY','AETNA','AD','API','APIS','ASSISTANCE','ARISTOCRAT',        'BACHELOR','BASIC','BABIES','BACK-UP',"BENEFIT",'BENEFITS','BUSINESS','BUILD',        'CA','CARE',"CITY",'CESSATION','COMMUTER','COMPANY','COMPENSATION','COMPUTER','CONTRIBUTION','COVID-19',        'D','DATA','DATADOG','DEDUCTIBLE','DESCRIPTION','DEGREE','DENTAL','DEPENDENT','DESIGN','DEVELOP','DEVELOPER','DEVELOPMENT',        'EMPLOYEE','EMPLOYER','ENGINEER','ENGINEERS','ENGINEERING','EXPEDIA','EXPERIENCE',        'FAMILY-BUILDING','FRAMEWORK','FLEXIBLE','FSA','FRANCISCO','FULL','GROUP',        'HEALTH','HEALTHFIRST','HEALTHCARE','HIGH','HOLIDAYS','HSA', 'INC.','INFORMATION','INSURANCE','IT',        'JOB','KNOWLEDGE','LGBTQ+','LIFE','LOSS','MANAGEMENT','MEDICAL', 'MUST','NEW','OPPORTUNITY',        'PAID','PAY','PLANS', 'PLEASE','PLAY','PLATFORM','PPO','PROGRAM','PROGRAMS','PRODUCT','PTO','PURCHASE',        'RANGE','RESTFUL','SAVINGS','SCIENCE','SERVICES','SECURITY','SICK','SOFTWARE','STATES','STOCK','SYSTEMS','SERVER','SAN','SERVICE','SKILLS','STRONG',        'TECHNOLOGY','TESLA','TOBACCO', 'TEAM','TIME','U.S.','UNITED','US','VISION','VACATION','WEB','WEIGHT','WORK','YORK']
        

        
    con = [i.upper() for i in con]

    df_tt = pd.DataFrame(con, columns=["Name"])
    df_tt = (df_tt.groupby(["Name"]).agg({"Name":["count"]}))
    df_tt.columns = df_tt.columns.droplevel()
    df_tt.reset_index(inplace=True)     
    df_tt = df_tt[df_tt["count"]>=100] #Only keep names with more than 150 "counts"


    df_tt = df_tt[~df_tt["Name"].isin(blocklist)].sort_values("count",ascending=False)
    return df_tt



# In[72]:


df2 = pd.read_csv("postings.csv")
df_linked = df2[["id","description"]]


# In[99]:


df_linked.info()


# In[91]:


get_ipython().run_cell_magic('time', '', 'adj_list,skill_list,con = Identification_Skills(df_linked)')


# In[92]:


df_skills = Aggregated_Analysis(skill_list)
df_non = Aggregated_Analysis(con)
df_adj = Aggregated_Analysis(adj_list)


# In[93]:


front=["HTML","Hypertext","CSS","Cascading","JAVASCRIPT","React","Vue","Angular","Svelte","Ember","Backbone",    "Polymer","TypeScript","Redux","Webpack","Babel","GraphQL","Gatsby","Next","JQuery","D3","Three"]
front = [i.upper() for i in front]

back = ['NODE','RUBY','DJANGO','LARAVEL','EXPRESS','FLASK','ASP','PHP','JAVA','PYTHON','GO','ELIXIR','METEOR', 'ADONISJS','NESTJS','SPRING','SINATRA','METEORJS']

#Create a column "Rank"
rank=[]
for i in range(len(df_skills)):
    rank.append(i+1)
df_skills["Rank"] = rank

#Create a column 
for i,j in df_skills.iterrows():
    if j["Name"] in front:
        df_skills.at[i,"End"]="Front"
    elif j["Name"] in back:
        df_skills.at[i,"End"]="Back"
    else:
        df_skills.at[i,"End"]="Non"


# In[97]:


df_skills


# In[98]:


df_skills.to_excel("Skills_name.xlsx")


# In[ ]:





# In[ ]:





# In[ ]:




