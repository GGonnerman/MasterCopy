import sklearn
from sklearn import datasets
from sklearn import svm
from sklearn import metrics
from sklearn.neighbors import KNeighborsClassifier

#load data we downloaded from sklearn
cancer = datasets.load_breast_cancer()

#print(cancer.feature_names)
#print(cancer.target_names)

#set our data
x = cancer.data
y = cancer.target

#training split
x_train, x_test, y_train, y_test = sklearn.model_selection.train_test_split(x, y, test_size=0.2)

#print(x_train, y_train)

classes = ['malignant', 'benign']

#moves the points to a higher dimensions based on the cordinates it has then tries to split them up if it can
clf = svm.SVC(kernel='linear', C=1)
#clf = KNeighborsClassifier(n_neighbors=9)
clf.fit(x_train, y_train)

#getting our accuracy
y_pred = clf.predict(x_test)

#cool built in scoring, finds percentage similarity between two lists
acc = metrics.accuracy_score(y_test, y_pred)
print(acc)
