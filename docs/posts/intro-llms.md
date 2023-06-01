---
title: "Introduction to Large Language Models"
categories:
  - 2023
tags:
  - LLMOps
---
# Introduction to Large Language Models
**May 15, 2023** 

<sup> * Acknowledgements: I would like to thank my co-author [Andy McMahon](https://twitter.com/ElectricwWeegie) for being an excellent collaborator on this article.</sup>

*This article will explore the concept of LLMs, their architecture, how they work, and their applications. Additionally, the article will also discuss the challenges in building LLMs, including the computational requirements and the ethical implications of using these models.*

![LLM Evolution](\assets\intro-llms\main.png)

Large Language Models (LLMs) are machine learning models trained on a massive amount of text data to generate human-like text or perform language-related tasks. These models are designed to understand and generate text in a way that mimics human language patterns and structures and can be thought of as the next generation after more traditional natural language processing (NLP) capabilities.

LLMs can be trained using various techniques, such as recurrent neural networks (RNNs), transformer-based models like GPT-4, or other deep learning architectures. The models typically work by being trained in a couple of phases, the first of which involves ‘masking’ different words within sentences so that the model has to learn which words should be correctly imputed or in providing words or sentences and asking the model to correctly predict the next elements of those sequences. Now, the latest LLMs may also incorporate other neural networks as part of the wider system, still often referred to as part of the LLM, which are ‘Reward Models’ (RMs) **[1]** that act to select an outputted response from the core model that aligns best with human feedback. These Reward Models are trained using reinforcement learning with human feedback (RLHF), a process which can require thousands of hours of subject matter experts providing feedback to potential LLM outputs.

## Understanding Large Language Models

Many traditional language models are statistical models used in NLP that can assign probabilities to items in a sequence of words or tokens in a target language. Consider if we had a language model trained on English, it could then be used to predict the next word in a sentence given the previous words. For example, if we input "I am going to the" into the language model, it may predict the next word as "store" with a high probability. These models can be trained using various techniques, including RNNs, LSTMs, transformers, and others.

LLMs are a subset of language models that are designed to generate large amounts of human-like text using few-shot learning**[2]**.

![LLM Training](\assets\intro-llms\LLMs_graph_1.jpeg)

These models can generate text that is contextually relevant, coherent, and indistinguishable from human-generated text. The dramatic increase of performance and the emergence of new capabilities in LLMs as they have been trained on huge amounts of data has led to the term ‘scale is all you need’ becoming a colloquial rule of thumb in some parts of the machine learning community. This is a tongue in cheek reference to the classic ‘Attention is all you need’ paper from Google, but it captures an important phenomenon that has been observed. This idea essentially captures that as we continue to scale to more and more data and larger and larger networks [3], we will continue to see the same sort of performance improvements we have until now. Whether or not these scaling behaviours will plateau is an open research question.

![Transformer Models](\assets\intro-llms\LLM_parameters.png)

## Architecture of Large Language Model

The architecture of an LLM varies depending on the specific implementation. However, most LLMs use a transformer-based architecture, which is a deep learning architecture that was first introduced in the Attention is All You Need paper in 2017. Transformers have become the dominant architecture for large-scale language models because of their ability to handle long-range dependencies and capture contextual information more effectively. They are also inherently scalable as the processing of different tokens can be achieved in parallel, which has been a key enabler for organisations building these models that are willing to invest in larger compute.

Transformers work by processing a sequence of input tokens (words, characters, etc.) and computing a representation for each token that captures its meaning in the context of the entire sequence. This is achieved through a mechanism called self-attention, which allows the model to weigh the importance of each token in the sequence when computing its representation. The self-attention mechanism allows the transformer to capture long-range dependencies and to learn context-aware representations of each token.

In addition to self-attention, transformers also use feedforward neural networks to process the representations of each token and generate the final output

## How many parameters does the large language model need to have?

The “number of parameters” is usually used as a key comparator between different large language models, but what does this actually mean?  These are essentially the variables that the model uses to learn and make predictions, more specifically the ‘weights’ and ‘biases’ of the trained neural network. These parameters are represented as floating-point numbers stored in matrices, and they capture the knowledge and patterns that the model has learned from the training data.

The number of parameters in a language model is directly related to its complexity and the amount of data it has been trained on. In general, a larger number of parameters allows for more complex patterns to be learned, which can result in better performance on a range of language tasks. However, training larger models also requires more data and computing resources, which can make it challenging to scale up to very large models.

As mentioned, the term "large language model" has no formal definition, but it generally refers to models with billions of parameters. For example, OpenAI's GPT-3 has 175 billion parameters, which is one of the largest publicly available language models to date. The LLaMA language model family, on the other hand, offers a range of sizes, from 7 billion parameters to 65 billion parameters.Its smaller models claim to match the performance of GPT-3 in terms of output quality and speed, while being able to run on a single high-end consumer GPU.

In summary, the number of parameters in a large language model can vary widely depending on the specific architecture and implementation, but it generally reflects the model's complexity and the amount of data it has been trained on. Models with billions of parameters can achieve impressive performance on a range of language tasks, but training and using them requires significant computational resources.

## Do you really need a large language model?

The question of whether a large language model (LLM) is necessary provides several points to consider. One point is that LLMs are undertrained, and more data and longer training can improve performance on various tasks. In addition, transformer inference costs are roughly linear with the number of parameters, so smaller models are cheaper to do inference with than larger ones. Scaling to multiple GPUs adds complexity, overhead, and cost, making smaller models more preferable. To give a concrete example, the training and inferencing with OpenAI’s models required the creation of a 1024 GPU cluster and the development of optimized ML pipelines utilizing parallel computing frameworks like Alpa and Ray**[10]**. The development and optimization of compute clusters at this scale is far beyond the reach of most organisations.

Another bottleneck of LLMs is the data. One approach to generating additional data is using Chain of Thought reasoning, as described in the Huang et al. paper. However, it is important to note that high-quality data really matters, and experiments consistently show that deduplicating data increases performance substantially.

The access to high quality data has been called out as a potential factor that will lead to a plateau in the progress of LLMs and that may break the ‘scale is all you need’ paradigm. The challenge is that after you have already trained on the majority of available corpora, not enough new high quality data is being generated to feed into newer, larger models. In fact, [Villalobos et al](https://arxiv.org/abs/2211.04325) suggest we will run out of high quality language data, defined to include books, scientific articles, Wikipedia and some other filtered web content, as soon as 2026. There have also been discussions around the potential pollution of the available data pool with LLM generated content, so that a feedback cycle ensues where LLM outputs are fed in as inputs. This could lead to an increase in negative effects like hallucinations.

Additionally, it is hard to reverse engineer the compute optimal without over-training the model. The Chinchilla paper **[4]** attempts to identify the optimal model size and number of tokens to train a LLM given a particular compute budget.

It is worth noting that a model trained on very few tokens might be "compute optimal," but it is not ideal for applications. Overall, **speculative sampling** may be a promising research direction for optimizing compute in large language model decoding. The key idea behind speculative sampling is to introduce randomness during the generation process to explore alternative possibilities and improve the diversity and quality of the generated samples. In traditional sampling methods, such as greedy sampling, the model generates samples by choosing the most likely output at each step.Speculative sampling aims to overcome this limitation by introducing controlled randomness during the sampling process. Instead of selecting the most likely output at each step, the model considers multiple possibilities and samples from a probability distribution. This distribution is typically derived from the output probabilities predicted by the model. By incorporating randomness, speculative sampling **[5]** encourages the model to explore alternative paths and produce more diverse samples. It allows the model to consider lower-probability outputs that might still be interesting or valuable. This helps to capture a wider range of possibilities and generate outputs that go beyond the typical, more probable samples.

**One common approach to speculative sampling is known as temperature scaling.** The temperature parameter controls the level of randomness in the sampling process. Higher temperatures increase randomness, allowing the model to consider a broader range of possibilities. Lower temperatures make the sampling process more focused and deterministic, favoring the most probable outputs.

It is important to consider the trade-offs involved in selecting a large language model, including cost, performance, data quality, and optimal compute.

## How to compress the Large Language Models to get equivalent performance within constrained environments aka smaller devices with less memory and compute limitations?

As discussed, LLMs require large amounts of computational resources not just for training but also for inferencing.This has led to a challenge of deploying these models on smaller devices such as mobile phones or embedded systems with limited resources.

To overcome this challenge, researchers have developed various model compression techniques to reduce the size of LLMs while maintaining their performance. One such technique is **quantization [7]**, which reduces the number of bits used to represent weights and activations in the model. For example, instead of using 32 bits to represent a weight value, quantization can reduce it to 8 bits, resulting in a smaller model size. Post-training quantization (PTQ) is one of the most popular techniques used to compress LLMs. It involves training the model with high precision and then quantizing the weights and activations to lower precision during the inference phase. This allows for a smaller model size while maintaining high performance. As quantization represents model parameters with lower-bit integer (e.g., int8), the model size and runtime latency would both benefit from such int representation. One significant example would be LLaMA.cpp that can run the inference of a LLaMa model with 4-bit quantization. This means that it can run Meta’s new GPT-3-class AI large language model on your laptop, phone, and Raspberry Pi.

Another technique is **pruning or sparsity**, which involves removing unnecessary connections or weights from the model. This reduces the number of parameters in the model and makes it more compact. Distillation is another technique where a smaller model is trained to mimic the behavior of a larger model. This allows for the smaller model to perform well while requiring less memory and compute resources.

**Neural architecture search (NAS)** is another technique that involves searching for the optimal architecture for a given task. This allows for the creation of a smaller and more efficient model that performs well on the specific task.

Overall, model compression techniques are critical for deploying LLMs in constrained environments such as smaller devices with less memory and compute limitations **[8]**. Researchers are continuously exploring new techniques to reduce the size of LLMs while maintaining their performance.

## Applications of Large Language Models

Although the use of LLMs in production is a relatively new concept, it is becoming clear that LLMs have a wide range of potential applications in NLP and related fields. Some of the most common applications include:

1. Language Generation: LLMs can generate contextually relevant and coherent text in response to a prompt or a question. This has led to the development of language generation applications, such as chatbots and virtual assistants, that can interact with users in natural language.
2. Text Classification: LLMs can classify text into different categories, such as sentiment analysis or topic modeling. This can be useful in applications such as social media monitoring or content moderation.
3. Machine Translation: LLMs can translate text from one language to another, making it easier for people to communicate across different languages.
4. Text Summarization: LLMs are excellent at summarizing large texts into smaller chunks, which can help users in a variety of different communications contexts..

While large language models have shown impressive performance on a variety of language tasks, **they also have limitations and potential drawbacks.** Some of these include:

1. **Data bias:** Language models are trained on large amounts of text data, which may contain biases and reflect the societal norms and values of the culture in which the data was collected. These biases can be reflected in the model's language generation and language understanding capabilities, and may perpetuate or amplify stereotypes and discrimination. Addressing this issue requires careful curation of training data and development of techniques to detect and mitigate biases in language models.
2. **Environmental impact:** The training of large language models requires significant computational resources which in turns can lead to large energy and water consumption and carbon emissions. The AI Index Report 2023 and the paper by Luccioni et al, showed that the training runs for many of the top performing LLMs emitted from 25-500 times the emissions from a New York to San Francisco flight, or up to 8 times the average total lifetime emissions of a car including fuel. The environmental impact of large language models has been a subject of debate and concern in the AI community, and efforts are underway to develop more energy-efficient and sustainable training methods.
3. **Limited interpretability:** While large language models can generate impressive and coherent text, it can be challenging to understand how the model arrives at a particular output. This lack of interpretability can make it difficult to trust or audit the model's outputs, and may pose challenges for applications where transparency and accountability are essential. Upcoming AI regulation like the European Union’s AI act, will likely demand greater transparency and auditability of these models, especially in domains like finance and healthcare. This will mean that the interpretability question will become crucially important for many organisations looking to adopt LLMs.
4. **Limited generalization:** While large language models can perform well on specific language tasks, they may struggle with generalizing to new or unseen data **[9]**. This can be a challenge in real-world applications where the model needs to operate in a dynamic and evolving environment with changing data distributions.
5. **Ethical concerns:** Large language models have the potential to be used for malicious purposes, such as generating fake news, impersonating individuals or even being used in sophisticated cyber attacks. There are also concerns around privacy and data security when using language models that generate or process sensitive information.

# Conclusion

As this post has described, the development of large language models has been an exciting development in the field of machine learning. LLMs are complex models that can perform a variety of tasks, many of which they were not explicitly trained for. The promise that LLMs will revolutionise many areas of the economy and solve problems across a variety of domains may prove, however, to be a difficult one to realise. There are many challenges to overcome. Of the several challenges discussed here, it is our belief that the consistent evaluation and the effective monitoring of these solutions will be the most acute in the near term and could inhibit the widespread adoption of these models in a safe and reliable way. We would like this to be a call to the community to ensure that they tackle these challenges in as transparent a way as possible, and help ensure that consistent evaluation and monitoring of these models becomes the norm. To support this, the authors are part of a working group attempting to study this question and we would ask for inputs to this collaboration as we seek to share best practice.

# References

1. Introduction to training Large Language Models https://wandb.ai/ayush-thakur/Intro-RLAIF/reports/An-Introduction-to-Training-LLMs-Using-Reinforcement-Learning-From-Human-Feedback-RLHF---VmlldzozMzYyNjcy
2. Language Models are Few-Shot Learners https://arxiv.org/abs/2005.14165
3. Scaling Hypothesis https://lastweekin.ai/p/the-ai-scaling-hypothesis
4. Training Compute Optimal Models [[2203.15556] Training Compute-Optimal Large Language Models (arxiv.org)](https://arxiv.org/abs/2203.15556)
5. Speculative Sampling [Speculative Sampling | Jay Mody (jaykmody.com)](https://jaykmody.com/blog/speculative-sampling/)
6. Decoding LLMs with Speculative Sampling https://arxiv.org/pdf/2302.01318.pdf
7. Quantization [[2002.11794] Train Large, Then Compress: Rethinking Model Size for Efficient Training and Inference of Transformers (arxiv.org)](https://arxiv.org/abs/2002.11794)
8. Model- Compression for Pre-trained models improves costs and boosts latency [[2303.05378] Greener yet Powerful: Taming Large Code Generation Models with Quantization (arxiv.org)](https://arxiv.org/abs/2303.05378)
9. Transformers are poor generalization models [Mind the Gap: Assessing Temporal Generalization in Neural Language Models (neurips.cc)](https://proceedings.neurips.cc/paper/2021/hash/f5bf0ba0a17ef18f9607774722f5698c-Abstract.html)
10. GPU Scaling with Alpa And Ray https://opendatascience.com/training-175b-parameter-language-models-at-1000-gpu-scale-with-alpa-and-ray/

## Citation
```
  @article{abi2023,
  title = "Introduction to Large Language Models",
  author= "Aryan, Abi; McMahon, Andy",
  journal = "abiaryan.com"
  year = "2023"
  month = "May"
  url = "https://abiaryan.com/posts/intro-llms/"
  }
```