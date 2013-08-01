import os
import cPickle
import numpy as np
import Image

def makeBatch (load_path, save_path, class_list):
    data = []
    filenames = []
    file_list = os.listdir(load_path)
    for item in  file_list:
        if item.endswith(".jpg"):
            n = os.path.join(load_path, item)
            input = Image.open(n)
            arr = np.array(input, order='C')
            im = np.fliplr(np.rot90(arr, k=3))
            data.append(im.T.flatten('C'))
            filenames.append(item)
    data = np.array(data)
    out_file = open(save_path, 'w+')
    flipDat = np.flipud(data)
    rotDat = np.rot90(flipDat, k=3)
    dic = {'batch_label':'batch 1 of 1', 'data':rotDat, 'labels':class_list, 'filenames':filenames}
    cPickle.dump(dic, out_file)
    out_file.close()

def get_data_dims(self, idx=0)
    return 3

def get_num_classes(self)
    return
