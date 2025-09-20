---
title: "CLEANing Cygnus A deep and fast with R2D2"
date: 2024-05-07
tags:
  [
    "radio astronomy",
    "image reconstruction",
    "machine learning",
    "radio interferometry",
    "deep learning",
    "optimisation",
  ]
author: ["Arwa Dabbech", "Amir Aghabiglou", "Chung San Chu", "Yves Wiaux"]
description: "This paper proposes a new deep learning-based paradigm, R2D2, for fast precision imaging in radio astronomy. Published in the Astrophysical Journal Letters, 2024."
summary: "This paper proposes a new deep learning-based paradigm, R2D2, for fast precision imaging in radio astronomy, along with its variants R2D2Net and R3D3. The proposed paradigm is demonstrated on real data of the radio galaxy Cygnus A, with comparison to CLEAN and state-of-the-art RI imaging algorithms, uSARA and AIRI."
cover:
  image: "r3d3.png"
  alt: "R3D3 reconstruction of Cygnus A"
  relative: true
editPost:
  URL: "https://iopscience.iop.org/article/10.3847/2041-8213/ad41df/"
  Text: "The Astrophysical Journal Letters"
---

---

##### Download

- [Paper (arXiv)](https://arxiv.org/abs/2309.03291)
- [Paper (journal)](https://iopscience.iop.org/article/10.3847/2041-8213/ad41df/)
- [Code and data](https://github.com/basp-group/R2D2-RI/tree/r2d2-python-v1.0)
- [Tutorial](https://github.com/basp-group/R2D2-RI/blob/r2d2-python-v1.0/tutorial_r2d2_python.ipynb)

---

##### Abstract

A novel deep-learning paradigm for synthesis imaging by radio interferometry in astronomy was recently proposed, dubbed “Residual-to-Residual DNN series for high-Dynamic range imaging” (R2D2). In this work, we start by shedding light on R2D2's algorithmic structure, interpreting it as a learned version of CLEAN with minor cycles substituted with a deep neural network (DNN) whose training is iteration-specific. We then proceed with R2D2's first demonstration on real data, for monochromatic intensity imaging of the radio galaxy Cygnus A from S-band observations with the Very Large Array. We show that the modeling power of R2D2's learning approach enables delivering high-precision imaging, superseding the resolution of CLEAN, and matching the precision of modern optimization and plug-and-play algorithms, respectively uSARA and AIRI. Requiring few major-cycle iterations only, R2D2 provides a much faster reconstruction than uSARA and AIRI, known to be highly iterative, and is at least as fast as CLEAN.

---

##### Figure 3: R3D3 reconstruction of the radio galaxy Cygnus A observed by the Very Large Array (VLA) at S band (2.052 GHz) using configuration A and C, displayed in $\textrm{log}_{10}$ scale.

![](r3d3.png)

---

##### Citation

Dabbech, Arwa, Amir Aghabiglou, Chung San Chu, and Yves Wiaux. "CLEANing Cygnus A deep and fast with R2D2." The Astrophysical Journal Letters 966, no. 2 (2024): L34. https://iopscience.iop.org/article/10.3847/2041-8213/ad41df/.

```BibTeX
@article{dabbech2024cleaning,
  title={CLEANing Cygnus A deep and fast with R2D2},
  author={Dabbech, Arwa and Aghabiglou, Amir and Chung San, Chu and Wiaux, Yves},
  journal={The Astrophysical Journal Letters},
  volume={966},
  number={2},
  pages={L34},
  year={2024},
  publisher={IOP Publishing},
  url={https://iopscience.iop.org/article/10.3847/2041-8213/ad41df/}
}
```

<!-- ---

##### Related material

- [Presentation slides](presentation1.pdf)
- [Summary of the paper](https://www.penguinrandomhouse.com/books/110403/unusual-uses-for-olive-oil-by-alexander-mccall-smith/) -->
