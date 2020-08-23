import pandas as pd
import numpy as np
import matplotlib.pyplot as pyplot
from matplotlib import style
import pickle
import sklearn
from sklearn import linear_model
from sklearn.utils import shuffle


data = pd.read_csv("student-mat.csv", sep=";") # seperating data set into an array

data = data[["G1", "G2", "G3", "studytime", "failures", "absences"]] #removing not needed data from set

predict = "G3" #setting what we want to predict

X = np.array(data.drop([predict], 1)) #X is the data that we're given
y = np.array(data[predict]) #Y is the data we want to predict
x_train, x_test, y_train, y_test = sklearn.model_selection.train_test_split(X, y, test_size = 0.1) # splitting training and testing data 


#Code we used to find the best model we could of the data "line of best fit"
'''
best = 0 
for _ in range(30):
    x_train, x_test, y_train, y_test = sklearn.model_selection.train_test_split(X, y, test_size = 0.1)

    linear = linear_model.LinearRegression()

    linear.fit(x_train, y_train)
    acc = linear.score(x_test, y_test)
    #print(acc)

    if acc > best:
        best = acc
        with open("studenmodel.pickle", "wb") as f: #pickling aka saving files to use later
            pickle.dump(linear, f)
'''
pickle_in = open("studenmodel.pickle", "rb") #opening our saved model data
linear = pickle.load(pickle_in) #does something im sure

print("Co: \n", linear.coef_)
print("Intercept: \n", linear.intercept_)

guess = linear.predict(x_test) #did we guess right?

for x in range(len(guess)):
    print(guess[x], x_test[x], y_test[x])

#print(best)

#maps all the data to a gragh so we know what effects what
p = 'G1' #change this to see correlations speciffically
style.use("ggplot")
pyplot.scatter(data[p], data["G3"])
pyplot.xlabel(p)
pyplot.ylabel("Final Grade")
pyplot.show()



