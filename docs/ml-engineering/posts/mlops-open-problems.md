---
title: "What's new in MLOps?"
categories:
  - MachineLearning
tags:
  - machine learning
  - software engineering
  - best practices
draft: true
date: 2022-10-23
---
**December 12, 2022** :bookmark_tabs: `ONGOING`

There are two ways of exploring MLOps. First, the industry way is by getting our hands dirty building something and using the tools, libraries, and frameworks available. This is a bad way of starting out. Reason being it’s so easy to get overwhelmed and lose perspective when inundated with so many choices - each time-consuming, with a steep learning curve. So, here’s a second way - the academic way. Let’s get a bird’s eye view of what’s going on in the field. MLOps as an academic research field is still new with only a handful of directly-relevant papers.

So, I compiled a list of some of my favorite papers 📜in MLOps.

### Some Papers in MLOps (as of Oct 2022)

1. The top one would be [Machine Learning: The High-Interest Credit Card of Technical Debt by D. Sculley et al](https://research.google/pubs/pub43146/). We invited him as a guest on our MLOps Community podcast (Spotify/iTunes) Episode #32 - def worth listening to! 

2. If there's one I would def read it would be [Machine Learning Operations (MLOps): Overview, Definition, and Architecture by Dominik, Niklas and Sebastian](https://research.google/pubs/pub43146/). It highlights necessary principles, components, and associated architecture and workflows in MLOps arxiv.org/abs/2205.02302

3. A recent one is [Operationalizing Machine Learning: An Interview Study by Shreya et al](https://arxiv.org/abs/2209.09125) which interviews 18 MLOps practitioners and discusses common practices across different stages of an ML project from experimentation ->deployment-> monitoring. 

4. While a guide for academia, but generally applicable best practices for all Data Scientists and ML Engineers is [How to avoid machine learning pitfalls: a guide for academic researchers by Michael A. Lones](https://arxiv.org/abs/2108.02497)

5. While [this one by Cote et al](https://arxiv.org/abs/2208.08982) is the description of researchers' approach to designing a study that would hopefully guide how to build quality assurance tools in ML Software Systems (the study is yet to be out) but it does bring attention to an open challenge. 

6. Next is a paper that talks about how to address the eng challenges associated with distributed training if u don't have the necessary infrastructure to match the big corps with infinite compute and a million hyperparameters. [Training Transformers Together](https://arxiv.org/abs/2207.03481)

7. Of course, the list won't be complete without a discussion of Jupyter NBs. But what would be the performance difference b/w notebooks vs scripts and the pros and cons of each? [📜A Large-Scale Comparison of Python Code in Jupyter Notebooks and Scripts](https://arxiv.org/abs/2203.16718)

8. But what about Production Infrastructure? How to cater to data stalls in the pre-processing pipeline? [Understanding Data Storage and Ingestion for Large-Scale Deep Recommendation Model Training](https://arxiv.org/abs/2108.09373)

9. Last, how can all the progress in machine learning guide the future of chip design? The paper by Jeff Dean provides an interesting outlook on hardware for software folks. [The Deep Learning Revolution and Its Implications for Computer Architecture and Chip Design](https://arxiv.org/abs/1911.05289)

### Core Challenges in MLOps [Quick Thoughts: Dec 2022]

??? Note
    Inspired by Advent of Code, [Advent of Data 2022](https://www.adventofdata.com/) is 24 data science, data engineering, machine learning articles by 24 authors until Christmas. This write-up is a re-post from the first post for Advent of Data: [MLOps isn’t DevOps for ML](https://www.adventofdata.com/mlops-isnt-devops-for-ml/) for  by me.

MLOps requires a lot of moving variables across the business, data, code as well as model engineering at each phase of the machine learning lifecycle introducing questions that are unique to ML.

Over the past few years, the adoption of cloud engineering, understanding of big data, and massive popularity of the open-source libraries for predictive modeling have made it easier for everyone to be enticed by the possibility to generate user insights or personalize their “software 1.0” by hiring a team of data scientists.

However, to most companies’ constant surprise, data scientists alone have been far from adequately equipped to handle/guide the end-to-end deployment or monitor or debug these models once deployed in production.

It truly needs an army, some in-house (DE/MLE) and some outsourced to the A.I. tooling/SaaS companies. While every data team at different companies is substantially different however there are some core challenges that are common to everyone.

1. For a machine learning model to be considered successful, it must be able to generate stakeholder buy-in. **Thus, it becomes incredibly important to tie the models to business KPIs instead of the accuracy scores** (F1, recall, precision, ROC, AUC). However, with business KPIs changing every so often through different stages it becomes incredibly hard to measure the model performances.

2. For any business to build powerful and reliable ML models, **investing effort into creating and maintaining a data catalog becomes crucial** to track meta-data and while debugging, to retrieve information on which data source is the model being trained on. While building a data catalog may not seem like a hard task but the real challenge is building relevancy into data discovery. This is often when a lot of companies give up. If you instead decide to opt for a commercial solution, most of the out-of-the-box commercial data cataloging solutions do not adapt well to different organizations’ data needs and cost several kidneys and more. Requesting a feature-add can put you on nothing short of an eight-ten month-long waitlist, optimistically speaking, if the requested feature is even aligned with their product plan. The final option i.e. to build an in-house solution requires upfront investment and a team with an excellent understanding of user-friendly database design practices thus making it a time and resource-consuming process. To make it even harder, there is a lack of documentation around best practices about creating, managing, and scaling an in-house data-cataloging tool and certain evaluation/compliance metrics so as to not end up with an incomplete catalog esp with the new live data being streamed into the system making the effort futile at best.

3. **Your machine-learning model is only as good as your data**. For any data science project to be successful, data quality and more importantly labeled data quantity are the biggest defining factors. However, best practices on data evaluation about how to standardize and normalize new incoming data are still case-by-case considerations. Most training environments need to come pre-loaded with few checks and balances based on the different stages of model deployment. For example, for a model that is being tested for production, has a random seed been set on the model to make sure that the data is divided the same way every time the code is run?

4. While there are many advantages to using commercial **feature stores** however they can also introduce inflexibility and also limit the customization of models and sometimes you simply don’t need them (more on this in a next month’s post). This inspires many to go with open-source solutions and develop their own on top of say Feast or DVC. While batch features may be easier to maintain, real-time features are sometimes inescapable for several reasons. Real-time features introduce a lot of complexity into the system, especially around back-filling real-time data from streaming sources with data-sharing restrictions. This requires not only technical but also process controls that are often not talked about. Recently, there has been more discussion around Data Contracts however, they are not yet a commonly accepted practice across organizations.

5. There is a lack of commonly well-defined best practices around **creating model version control or project structures at different stages from exploration to deployment**. [Cookie cutter](https://drivendata.github.io/cookiecutter-data-science/) is one of the efforts toward developing a unified project structure for cross-team collaborations.
    
    ![Github Template for ML/DS Projects](/ml-engineering/assets/mlops/1.png)
    
    Undefined/poorly defined prerequisites about when to push a model in production can create unnecessary bugs and introduce delays during monitoring and debugging.
    
6. **Code Reviews** how much time should be spent on code review in different stages especially given the model behavior may not accurately represent live training data and how frequently should they happen? Different companies currently have different systems for it. While some prefer one-off deployment, others have more clustered deployment stages eg. test, dev, staging, shadow, and A/B for business-critical pipelines with different review stages and guidelines. However, even the end-to-end tools do not have any in-built support for the same. It’s very much only institutional knowledge as of now as to what makes good quality production code.

7. While it is clear to everyone that **test-driven development is critical to catch minor errors early** in the deployment stage however how much time and effort be invested in the same given there are large samples of data that can only be gathered once the model is deployed in production?

8. To **use static validation sets** to test the models in production which can introduce bias **or dynamic validation sets** to more closely resemble live data and address localized shifts in data.

9. Should we use **model registries** or change only config files instead of the model thus making it easier to debug? For the former, if model validation passes all checks, the model is usually passed to a model registry.

10. Having clearly defined **rule-based tests** to make sure the model outputs are not incorrect while factoring in when is it okay to give incorrect outputs (for eg. shopping recommendations) vs to give no outputs (for eg. cancer prescriptions).

11. **Best practices around code quality** and a need for similar deployment environments. While most data scientists prefer working with Jupyter NBs however the way code is usually written in NBs (copy-paste) instead of re-using functions, can introduce unnecessary bugs and introduce technical debt affecting the model as well as the integration code when the notebook owner leaves the team.

12. While experiment tracking tools and dashboards have added quite some observability to the model runs, contextual changes still remain majorly undocumented.

13. While sandbox tools to stress-test can be quite useful in some scenarios, however in others for eg. recsys it may not generate any useful information whatsoever.

14. The warnings about which alerts are critical and require a quick migration to a failsafe model (for eg. hate speech, racial or gender bias) and which ones are mere information to be factored in for the next model configuration phase still require close human monitoring.

I am working on a longer blog-post of the same for MLOps.Community - to recieve it when it goes out first subscribe to my [Substack](https://datadrivenbabe.substack.com/). It's free. I send out one letter a month exclusively on MLOps.

### Some Papers in MLOps (as of Dec 2022)

Some more MLOps papers 📜 you may find interesting to read a little further into the best practices and challenges with machine learning models deployed in production. ⤵️

1. This is not a paper but a blogpost from Microsoft around the same lines as [Google's 2014 paper about High Credit Card Interest Debt paper by Sculley et al](https://github.com/abi-aryan/abiaryan/blob/main/docs/ml-engineering/posts/mlops-open-problems.md#L20) -
[💬Technical debt in Machine Learning: Pay off this “high interest rate credit card”](https://medium.com/data-science-at-microsoft/technical-debt-in-machine-learning-pay-off-this-high-interest-rate-credit-card-sooner-rather-34396d525dff) sooner rather than later.

2. Testing and monitoring are key considerations for ensuring the production-readiness of an ML system, and for reducing the technical debt of ML systems. In this paper, [The ML test score: A rubric for ML production readiness and technical debt reduction](https://ieeexplore.ieee.org/abstract/document/8258038) the authors present 28 specific tests and monitoring needs.

3. In this paper [Large-scale machine learning systems in real-world industrial settings](https://www.sciencedirect.com/science/article/abs/pii/S0950584920301373), the authors identify a total of 23 challenges and 8 solutions related to the development and maintenance of large-scale ML-based software systems in industrial setting.

4. Remember [distill.pub's Research Debt article](https://distill.pub/2017/research-debt/) that caused a massive debate in ML Res community about Reproducibility? In this paper, [Do machine learning platforms provide out-of-the-box reproducibility](https://www.sciencedirect.com/science/article/pii/S0167739X21002090), the authors propose a framework for it.

5. 😍 by none other than Zachary Lipton et al - a no-brainer if you have read his excellent work in interpretability. [Failing Loudly: An Empirical Study of Methods for Detecting Dataset Shift](https://proceedings.neurips.cc/paper/2019/hash/846c260d715e5b854ffad5f70a516c88-Abstract.html) proposes a two-sample-testing-based approach for dim reduction.

6. One of my fav papers is [Large scale distributed neural network training through online distillation by Rohan Anil et al](https://arxiv.org/abs/1804.03235) that talks about the test-time cost for ensemble modelling and an alternative i.e. online distillation that's far more cost effective.

7. Privacy and security is such an important part of software development however, not often talked about in ML. In this paper, [Adversarial Machine Learning-Industry Perspectives](https://ieeexplore.ieee.org/abstract/document/9283867) the authors interviewed 28 orgs to propose amends in the Security Development Lifecycle for industrial-grade software in ML era.

8. Last but not the least, is [Towards Accountability for Machine Learning Datasets: Practices from Software Engineering and Infrastructure](https://dl.acm.org/doi/abs/10.1145/3442188.3445918). It proposes a rigorous framework for dataset development transparency that supports decision-making and accountability.