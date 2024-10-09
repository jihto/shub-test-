// Run program: yarn ts-node index.ts
import axios from 'axios';

const getInputData = async () => {
    const response = await axios.get('https://test-share.shub.edu.vn/api/intern-test/input');
    return response.data;
};

const postOutputData = async (token: string, results: number[]) => {
    await axios.post(
        'https://test-share.shub.edu.vn/api/intern-test/output', 
        results , 
        {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        }
    );
};


const solve = async () => { 
    const { token, data, query } = await getInputData(); 
    const n = data.length;
    const prefixSum = new Array(n + 1).fill(0);
    const evenOddPrefixSum = new Array(n + 1).fill(0);

    for (let i = 1; i <= n; i++) {
        prefixSum[i] = prefixSum[i-1] + data[i-1];
        evenOddPrefixSum[i] = evenOddPrefixSum[i-1] + (i%2 === 1 ? data[i-1] : - data[i-1]);
    }

    const results: number[] = new Array(); 
    for (const q of query) {
        const l = q.range[0] + 1; 
        const r = q.range[1] + 1;

        if (q.type === "1") { 
            const sum = prefixSum[r] - prefixSum[l-1];
            results.push(sum);
        } else if (q.type === "2") { 
            const sum = evenOddPrefixSum[r] - evenOddPrefixSum[l-1];
            results.push(sum);
        }
    } 
    await postOutputData(token, results);
};

solve() 
    .catch(error => console.log(error));
