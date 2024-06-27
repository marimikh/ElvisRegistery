import { Variable } from "../data/Types";

// TODO 
// - Test objectSortAbstract
// - Implement proper sort for Norwegian alphabet 

 function getNestedPropertyValue(obj: any, path: string): string | undefined {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
  }
  
  export  function objectSort(a: Variable, b: Variable, sortBy: string, sortOrder: 'asc' | 'desc') {
    const valueA = getNestedPropertyValue(a, sortBy);
    const valueB = getNestedPropertyValue(b, sortBy);
  
    if (typeof valueA === 'string' && typeof valueB === 'string') {
      return sortOrder === 'asc' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
    } else if (typeof valueA === 'number' && typeof valueB === 'number') {
      return sortOrder === 'asc' ? valueA - valueB : valueB - valueA;
    } else {
      return 0;
    }
  }
  

  function objectSortAbstract<T>(
    a: T,
    b: T,
    sortBy: string, 
    sortOrder: 'asc' | 'desc' = 'asc'
  ): number {
  
    const valueA = getNestedPropertyValue(a, sortBy);
    const valueB = getNestedPropertyValue(b, sortBy);
  
    if (valueA === null || valueA === undefined) return -1;
    if (valueB === null || valueB === undefined) return 1; 
  
    if (typeof valueA === 'string' && typeof valueB === 'string') {
      return sortOrder === 'asc' 
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
    } else if (typeof valueA === 'number' && typeof valueB === 'number') {
      return sortOrder === 'asc' ? valueA - valueB : valueB - valueA;
    } 
  
    return 0;
  }