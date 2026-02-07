/* ===================================================================
   DATA
   Centralized data for publications and skills
   =================================================================== */

const DATA = {
    publications: [
        {
            title: "Weakly Supervised Detection of Pheochromocytomas and Paragangliomas in CT using Noisy Data",
            journal: "Computerized Medical Imaging and Graphics",
            year: 2024,
            category: "medical-imaging",
            tags: ["Medical Imaging", "Deep Learning", "CT Scans"],
            url: "https://doi.org/10.1016/j.compmedimag.2024.102419"
        },
        {
            title: "Weakly Supervised Detection of Pheochromocytomas and Paragangliomas in CT",
            journal: "SPIE Medical Imaging Conference Proceedings",
            year: 2024,
            category: "medical-imaging",
            tags: ["Medical Imaging", "CNN"],
            url: "https://doi.org/10.1117/12.3008833"
        },
        {
            title: "MEA-NAP: A flexible network analysis pipeline for neuronal 2D and 3D organoid multi-electrode recordings",
            journal: "Cell Reports Methods",
            year: 2024,
            category: "neuroscience",
            tags: ["Neuroscience", "Network Analysis", "Organoids"],
            url: "https://doi.org/10.1016/j.crmeth.2024.10090"
        },
        {
            title: "MEA-NAP compares microscale functional connectivity, topology, and network dynamics in organoid or monolayer neuronal cultures",
            journal: "bioRxiv",
            year: 2024,
            category: "neuroscience",
            tags: ["Neuroscience", "Functional Connectivity"],
            url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10871179/"
        },
        {
            title: "Human iPSC-derived Neurogenin-2 (NGN2) Cortical Neurons Develop Functional Connectivity and Small-world Network Topology In Vitro",
            journal: "Neurology",
            year: 2024,
            category: "neuroscience",
            tags: ["Neuroscience", "iPSC", "Network Topology"],
            url: "https://doi.org/10.1212/WNL.0000000000212109"
        },
        {
            title: "Development and Validation of a Bayesian Network Predicting Neurosurgical Intervention after Injury in Children and Adolescents",
            journal: "Journal of Trauma and Acute Care Surgery",
            year: 2023,
            category: "clinical",
            tags: ["Clinical", "Bayesian Networks", "Pediatrics"],
            url: "https://doi.org/10.1097/TA.0000000000003935"
        },
        {
            title: "Rett Syndrome: A Tale of Altered Genetics, Synaptic Plasticity, and Neurodevelopmental Dynamics",
            journal: "Cureus",
            year: 2023,
            category: "neuroscience",
            tags: ["Neuroscience", "Genetics", "Review"],
            url: "https://doi.org/10.7759/cureus.41555"
        }
    ],

    skills: [
        "Python",
        "MATLAB",
        "JavaScript",
        "R",
        "CSS",
        "HTML",
        "PyTorch",
        "TensorFlow",
        "SQL",
        "OpenCV",
        "MongoDB"
    ]
};

// Make data available globally
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DATA;
}
