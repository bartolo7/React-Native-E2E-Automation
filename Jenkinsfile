
def kill_simulators(){
    sh "adb -s emulator-5554 emu kill || true"
    sh "xcrun simctl shutdown all || true"
}

def reporterHTML(device){
    fileHTML = "${device}.html".toLowerCase()
    publishHTML (target: [
                    allowMissing: false,
                    alwaysLinkToLastBuild: true,
                    keepAll: true,
                    reportDir: "${WORKSPACE}/test-report",
                    reportFiles: "${fileHTML}",
                    reportName: "Appium report ${device}"])
}

// Directories
def path_key= "PATH IN THE JENKINS SERVER TO ANDROID KEYS"
def app_repo = "AppRepo"
def pipeline_root_dir = null 

// Android 
def apk_name = "<write-your-name>.apk"
def apk_destination = "<write-your-folder-name>/android/app/build/outputs/apk/"
def apk_path = null

// IOS 
def app_name = "<write-your-name>.app"
def app_destination = "<write-your-folder-name>/ios/build/Build/Products/Release-iphonesimulator"
def app_path = null 


node () {
        try {
            stage ('Checkout & Install Dependencies'){
                deleteDir()
                checkout scm
                
                apk_path = "${WORKSPACE}/${app_repo}/${apk_destination}/${apk_name}"
                app_path = "${WORKSPACE}/${app_repo}/${app_destination}/${app_name}"

                sh "mkdir -p ${app_repo}"

                dir ("${app_repo}"){
                    sh "git clone -b master https://<write-your-React-Native-App>.git"
                }

                //Two keys required to build .apk
                sh "cp ${path_key}/keys/keystore.properties ${WORKSPACE}/${app_repo}/<write-your-folder-name>/android/keystore.properties"
                sh "cp ${path_key}/keys/keys.jks ${WORKSPACE}/${app_repo}/<write-your-folder-name>/android/app/my-release-key.jks"
                
                dir ("${app_repo}/<write-your-folder-name>"){
                    lock(resources: 'JSBundler'){
                        sh "yarn"
                        sh "yarn set-env test"
                    }
                } 
            }    
            stage ('Build .apk & .app'){
                dir ("${app_repo}/<write-your-folder-name>"){ 
                    parallel (
                            ".apk" : { lock( resources:'JSBundler') {sh "yarn build-android"}},
                            ".app": { lock( resources:'JSBundler'){ sh "yarn build-ios"} }
                        )
                }
                dir ("${WORKSPACE}/${app_repo}/${apk_destination}"){
                    sh "ls -a"
                }
                dir ("${WORKSPACE}/${app_repo}/${app_destination}"){ 
                    sh "ls -a"
                }
            }
            stage ('Run Emulator & Simulator'){
                try {
                        parallel (
                            "Emulator" : { sh "yarn runAndroid" },
                            "Simulator": { sh "yarn runIOS" }
                        )
                }
                catch (err) { echo "The Emulator or Simulator did not open" }
            }
            stage ('Appium E2E Android'){
                try {
                    sh "yarn"
                    sh "yarn startAppium"
                    pipeline_root_dir = "${WORKSPACE}/${app_repo}/<write-your-folder-name>"

                    sh "TEST=\"<write-your-test>\" PIPELINE_ROOT_DIR=\"${pipeline_root_dir}\" yarn testAndroid:singleTest"

                    //sh "PIPELINE_ROOT_DIR=\"${pipeline_root_dir}\" yarn testAndroid"
                    
                } finally {

                    reporterHTML('Android')
                }   
            }
            stage('Appium E2E IOS')
            {
                try {
                    sh "yarn"
                    sh "TEST=\"<write-your-test>\" PIPELINE_ROOT_DIR=\"${pipeline_root_dir}\" yarn testIOS:singleTest"

                }finally{

                    reporterHTML('IOS')
                }
                
            }
        } 
        catch(Exception e){

        }
        finally{
            kill_simulators()
        }   
} 