import sklearn
from sklearn.utils import shuffle
from sklearn.neighbors import KNeighborsClassifier
from sklearn import linear_model, preprocessing
import pandas as pd
import numpy as np

data = pd.read_csv("car.data") #grabbing our data

le = preprocessing.LabelEncoder() #convert strings into numbers automatically

#splits all the data into lists of data but specific
buying = le.fit_transform(list(data["buying"]))
maint = le.fit_transform(list(data["maint"]))
door = le.fit_transform(list(data["door"]))
persons = le.fit_transform(list(data["persons"]))
lug_boot = le.fit_transform(list(data["lug_boot"]))
safety = le.fit_transform(list(data["safety"]))
cls = le.fit_transform(list(data["class"]))

#setting what we want
predict = "class"

#setting testing and wanted data
x = list(zip(buying, maint, door, persons, lug_boot, safety))
y = list(cls)

x_train, x_test, y_train, y_test = sklearn.model_selection.train_test_split(x, y, test_size = 0.1)

#finds n amount of points around it and asks what type of point are you, majority rule chooses new point type
model = KNeighborsClassifier(n_neighbors=9)

#trains it on our data
model.fit(x_train, y_train)
acc = model.score(x_test, y_test)
print(acc)

names = ["unacc", "acc", "good", "vgood"]

predicted = model.predict(x_test)
for x in range(len(x_test)):
    print("predicted:", names[predicted[x]], "   Data:", x_test[x], "   Actual:", names[y_test[x]])
    #n = model.kneighbors([x_test[x]], 9, True)
    #print("N:", n)
