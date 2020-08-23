import numpy as np
import sklearn
from sklearn.preprocessing import scale
from sklearn.datasets import load_digits
from sklearn.cluster import KMeans
from sklearn import metrics

digits = load_digits()
data = scale(digits.data)
y = digits.target

#k = len(np.unique(y)) # Dynamic way of finding how many clusters to use
k = 10
samples, features = data.shape #aparently this makes sense to python people


#function straight from sklearn
def bench_k_means(estimator, name, data):
    estimator.fit(data)
    print('%-9s\t%i\t%.3f\t%.3f\t%.3f\t%.3f\t%.3f\t%.3f'
          % (name, estimator.inertia_,
             metrics.homogeneity_score(y, estimator.labels_), #since its blind to the actual awnser while testing
             metrics.completeness_score(y, estimator.labels_), #can just test off the labels of the data we pass it
             metrics.v_measure_score(y, estimator.labels_),
             metrics.adjusted_rand_score(y, estimator.labels_),
             metrics.adjusted_mutual_info_score(y,  estimator.labels_),
             metrics.silhouette_score(data, estimator.labels_,
                                      metric='euclidean')))

clf = KMeans(n_clusters = k, init='random', n_init=10,) #making our function, lots of different ways to set this up
bench_k_means(clf, "1", data) #passing our model to the scoring function



