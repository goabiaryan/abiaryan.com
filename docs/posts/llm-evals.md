---
title: "Evaluation and Interpretation for LLMs"
categories:
  - 2023
tags:
  - LLMOps
  - Machine Learning
---
**June 14, 2023** 

<sup> * Acknowledgements: I would like to thank my co-author [Andy McMahon](https://twitter.com/ElectricWeegie) for being an excellent collaborator on this article.</sup>

![LLMMaps - A Visual Metaphor for Stratified Evaluation of Large Language Models](\assets\evals\1.png)

### ML model evaluation - learning to trust ML systems
The development and deployment of ML solutions requires new types of testing and evaluation not present in traditional software development. In particular, machine learning models introduce stochastic and statistical behaviors that need to be tested in aggregate across datasets, as well as on specific atomic pieces of data that can help validate base functionality. For the purposes of this article, this process is referred to as 'evaluation'.

**Evaluation of ML models is an activity where there is now a very large body of suggested best practice.**

With the rise of Large Language Models (LLMs) however, the question of what best evaluation practice looks like must be revisited as some assumptions usually employed no longer hold or need augmented.

### Why is evaluation hard for language models?

There are a number of reasons why evaluation is hard for generative language models. Some of the most common reasons include:
1. Human language is complex: Human language is very complex and can be difficult to quantify. This makes it difficult to develop evaluation metrics that accurately measure the quality of language model outputs.
2. Language models are trained on large datasets: Language models are typically trained on large datasets of text. This makes it difficult to find a representative sample of text to use for evaluation.
3. Language models can be biased: Language models can exhibit bias in line with the datasets they are trained on. This can lead to language models generating text that is not deemed acceptable against some social, ethical or legal norms.
4. Language models can be difficult to interpret: Language models are very complex and it can be difficult to interpret why they generate particular outputs. This can lead to challenges around reproducibility and consistent experimental design.

Despite these challenges, there are a number of methods that can be used to evaluate language models. Some of the most common methods include:

1. Perplexity: Perplexity [1] is a measure of how well a language model can predict the next word in a sequence. A lower perplexity score indicates that the language model is better at predicting the next word.

![Perplexity - Hugging Face](\assets\evals\2.png)

2. BLEU score: BLEU [2] score is a measure of how similar a generated text is to a reference text. A higher BLEU score indicates that the generated text is more similar to the reference text.

![Google - BLEU Score](\assets\evals\3.png)

3. Human evaluation: Human evaluation is the process of asking humans to rate the quality of generated text. Human evaluation is considered to be the gold standard for evaluating language models, but it is also the most time-consuming and expensive method.

*In the past, transformer based language models were typically evaluated using perplexity and the BLEU score.* However, these metrics have been criticized for being too simplistic and not taking into account much of the nuance of human language. This is counteracted somewhat when using techniques based on human evaluation, however this can also be the most time-consuming and expensive approach, with particular challenges around scaling to large input and outputs, as is the case with LLMs. Thus, it is often not feasible to use human evaluation to evaluate many of the latest language models at scale.

**In the recent years, there has been a growing interest in developing new evaluation metrics that are more sensitive to some of the more nuanced aspects of human language.**

The question of performance evaluation is complex, but in addition to this, it is also important to consider the interpretability of language models.

**Interpretability** in this case refers to the capacity for clear and unambiguous communication of why a model has produced a particular output given a specific input, as far as is possible.

Language models have complex architectures, hundreds of billions of trained parameters and often perform tasks in ways not currently understood mechanistically so can be difficult to interpret unambiguously. This makes it difficult to understand why a language model generates a particular output and, for example, explain this to downstream customers of applications leveraging these outputs.

As these models begin to find their way into deployed solutions across the global economy, it will also be critically important to develop methods for interpreting language models.

Interpretability of language models in an active area of research and there is no settled best practice approach, similarly to the case for performance evaluation. Some interesting approaches for interpreting these models are:

1. Contrastive explanations [3]: Attempting to predict why a language model generated one token and not another.
2. Perturbation based importance methods, i.e the extension of SHAP [4]: These are methods where inputs are altered in some way and the change in output measured, for example by extending the SHAP method to work with transformers. Note that this only makes sense for classification tasks, and does not help in generative tasks, but it's worth mentioning here.
3. Mechanistic interpretability techniques [5]: These are approaches where the aim is to deconstruct specific neuronal activations inside language models as they perform certain tasks, so as to correlate the one with the other. The aim being to eventually decode neural networks into human understandable code. This covers a large number of techniques and is a very active area of research.

### The Generative Challenge
The problems of evaluation and interpretability become very challenging when using LLMs in a generative setting, for example in a chat interface or in an augmented information retrieval setting. This is because LLMs are by default performing token and sequence prediction, and are not necessarily utilizing representational models of the data they have consumed, though there is some debate about whether this is completely the case. This means that LLMs can generate plausible text that can be factually, logically or semantically incorrect. This is the well known problem of *hallucinations* in LLMs and it makes performance evaluation and interpretability difficult because the challenges mentioned in the previous section are the most salient in this setting.

These challenges are amplified further by the use of vendor-based large language models like Chat GPT, Bard or Bing Chat. As more and more companies move to closed-versions of the models it becomes increasingly difficult to perform reproducible experiments to ascertain performance. The details that remain internal to these providers include core information like the training datasets, the trained model parameters as well as information on any human evaluation mechanisms used like Reinforcement Learning with Human Feedback (RLHF, see our [previous blog post](https://abiaryan.com/posts/intro-llms/) [6] and "red-teaming" (testing the models with adversarial examples).

However, the challenges around evaluation and interpretability have not stopped companies racing to integrate these models into their solutions. Whether for use as knowledge retrieval on internal documentation (Notion), no-code software development solutions (Zapier), AI augmented pair-programming (repl.it), copywriting (Jasper.ai) or chatbots (several) amongst others.

Although the race is on to create LLM infused products the risks of models being deployed in production without any concrete guardrails and in the absence of strict performance and interpretability guarantees is a key concern amongst organizations because of the un-predictable behavior of LLMs. These concerns have been voiced by several individuals and organizations over the past few months.

Any operational machine learning solution must provide some expected performance characteristics before going into production. The solution must also have the ability to be monitored effectively in order to ensure that changes in performance post-deployment are efficiently identified and solutions provided if possible. We can break this down further into the following three points:

1. It helps to ensure that they are performing as expected.
2. It can help to identify areas where LLMs can be improved.
3. It can help to ensure that LLMs are being used in a safe and responsible manner.

_This is part 1 of a two part-series article. In the update of this blogpost, we will explore the how to think about an evaluation framework and what goes into a comparison of the existing evals/leaderboards and what such comparisons mean._

#### References:
1. [Evaluation Metrics for Language Modeling (thegradient.pub)](https://thegradient.pub/understanding-evaluation-metrics-for-language-models/)
2. [Bleu: a Method for Automatic Evaluation of Machine Translation - ACL Anthology](https://aclanthology.org/P02-1040/)
3. [Interpreting Language Models with Contrastive Explanations (arxiv.org)](https://arxiv.org/abs/2202.10419)
4. [BERT meets Shapley: Extending SHAP Explanations to Transformer-based Classifiers](https://aclanthology.org/2021.hackashop-1.3/)
5. [An Extremely Opinionated Annotated List of My Favourite Mechanistic Interpretability Papers - Neel Nanda.](https://www.neelnanda.io/mechanistic-interpretability/favourite-papers#language-models=)
6. [Introduction to Large Language Models | The LLMOps Brief | May, 2023 | Medium](https://medium.com/the-llmops-brief/introduction-to-large-language-models-9ac028d34732)