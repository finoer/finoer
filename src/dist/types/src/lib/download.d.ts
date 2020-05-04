/**
 * @func  clone the code repository remotely
 * @param target project name
 * @param templateUrl code repository
 */
declare function downloadRepo(target: string, templateUrl: string): Promise<any>;
export default downloadRepo;
