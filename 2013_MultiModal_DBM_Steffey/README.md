- Running Ubuntu 12.04 – 64bit
- Install Python 2.7.3
- Install Numpy (1.7)
- Install Scipy (0.90)
- Install CUDA 4.2 Toolkit and SDK
- Set the all environment variables by adding the following to the ~/.bashrc file:
      export CUDA_BIN=/pkgs_local/cuda-4.2/bin
      export CUDA_LIB=/pkgs_local/cuda-4.2/lib64
      export PATH=${CUDA_BIN}:$PATH
      export LD_LIBRARY_PATH=${CUDA_LIB}:$LD_LIBRARY_PATH
      export CPLUS_INCLUDE_PATH=CPLUS_INCLUDE_PATH:/pkgs_local/cuda-4.2/cuda/include
 
- Obtain Google Protocol Buffers.
    Available from http://code.google.com/p/protobuf/
    Make sure that the PATH environment variable includes the directory that
    contains the protocol buffer compiler - protoc. By adding the following to ~/.bashrc
      export PATH=$HOME/local/bin:$PATH
 
- Run make in the cudamat directory to compile the CUDAmat library
 
- Compile CUDA-convnet by:
                  - Editing the appropriate paths in cudamat_conv/build.sh.
                	- running build.sh in cudamat_conv

 
  
 
- Add the path to cudamat and cudamat_conv to LD_LIBRARY_PATH. For example if
    DeepNet is located in the home dir,
      Export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:$HOME/deepnet/cudamat:$HOME/deepnet/cudamat_conv
- Add the path to DeepNet to PYTHONPATH. For example, if DeepNet is located in the
    home dir,
      export PYTHONPATH=$HOME/deepnet:$PYTHONPATH
 
 
(TEST INSTALLATION SO FAR)
  - Download and extract the MNIST dataset from http://www.cs.toronto.edu/~nitish/deepnet/mnist.tar.gz
    This dataset consists of labelled images of handwritten digits as numpy files.
  - cd to the deepnet/deepnet/examples dir
  - run
    $ python setup_examples.py <path to mnist dataset> <output path>
    This will modify the example models and trainers to use the specified paths.
  - There are examples of different deep learning models. Go to any one and
    execute runall.sh. For example, cd to deepnet/deepnet/examples/rbm and execute
    $ ./runall.sh
    This should start training an RBM model.
 
 
For utilizing the count / tally scripts
            	Edit both script files to change the pertinent database information in the labeled SQL section (Database name, User, Password, etc)
            	Run Count first,  which will create a vocab of the top 2000 most frequent keywords.  Then, run Tally.  This will create two output files
            	Currently, Tally produces two output txt files, and one output .npy files
            	The .npy file is for use with the standard DBM example only.  The input format for our custom multimodal DBM is specialized, and requires .npz files.  This is where the txt files are to be used.
            	Each txt file corresponds to one of the arrays in the npz files from text_all_2000 and text_nnz_2000

